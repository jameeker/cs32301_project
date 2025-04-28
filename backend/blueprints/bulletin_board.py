from flask import Blueprint, jsonify, request
from datetime import datetime, date
from database.db import get_db, create_new_note, get_public_notes, save_note_to_personal, Note, NoteState

# Create the blueprint
bulletin_board = Blueprint('bulletin_board', __name__, url_prefix='/api/bulletin-board')

# Used to keep track of when to reset the board
last_reset_date = date.today()

#last_reset_date = date(2025, 1, 1) # Used to test the check_for_reset() by setting the last_reset_date to an earlier date

@bulletin_board.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({"status": "success", "message": "Bulletin board API is working"})

# Temporary note storage (will be replaced with database models later)
notes = [
    {
        'id': 1,
        'content': 'Welcome to the Bulletin Board!',
        'color': '#FEFF9C',
        'position_x': 100,
        'position_y': 100,
        'created_at': datetime.utcnow().isoformat()
    }
]

# Temporary prompt storage (probably replaced with database later)
prompts = [
    {
        'id': 1,
        'content': "What's on your mind today?",
        'color': "#FFFFF3",
        'position_x': 50,
        'position_y': 100,
        'is_prompt': True
    },
    {
        'id': 2,
        'content': "Write the world a story!",
        'color': "#FFFFF3",
        'position_x': 200,
        'position_y': 100,
        'is_prompt': True
    },
    {
        'id': 3,
        'content': "Share a random thought.",
        'color': "#FFFFF3",
        'position_x': 350,
        'position_y': 100,
        'is_prompt': True
    }
]

# A list of default prompts (hard coded right now) to be added to prompts in the reset_board() function
default_prompts = [
    {
        'id': 1,
        'content': "DEFAULT PROMPT 1. (should be put into prompts after board reset)",
        'color': "#FFFFF3",
        'position_x': 700,
        'position_y': 200,
        'is_prompt': True  # Explicitly set as a prompt
    },
    {
        'id': 2,
        'content': "DEFAULT PROMPT 2. (should be put into prompts after board reset)",
        'color': "#FFFFF3",
        'position_x': 200,
        'position_y': 500,
        'is_prompt': True  # Explicitly set as a prompt
    }
]

#####################################################
# Note FUNCTIONS:
#####################################################

# Initial function to test with Postman 
@bulletin_board.route('/notes', methods=['GET']) # API endpoints
def get_all_public_notes():
    db = get_db()
    notes_with_states = get_public_notes(db)
    
    # Transform SQLAlchemy objects to JSON-serializable dictionaries
    result = []
    for note, state in notes_with_states:
        result.append({
            'id': note.note_id,
            'content': note.content,
            'color': note.color,
            'type': note.type,
            'is_prompt': note.is_prompt,
            'position_x': state.position_x * 1000,  # Convert from 0-1 range to pixels
            'position_y': state.position_y * 500,   # Adjust multiplier based on your board size
            'rotation': state.rotation,
            'z_index': state.z_index
        })
    
    return jsonify(result)

# Get community notes
# Checks if its time for a board reset every time this is called
# @bulletin_board.route('/notes', methods=['GET'])
# def get_community_notes():
#     check_for_reset()
#     return jsonify(notes)

# Create a new note
@bulletin_board.route('/notes', methods=['POST'])
def create_note():
    data = request.json
    
    # Simple validation
    if not data or 'content' not in data:
        return jsonify({"error": "Content is required"}), 400
    
    try:
        db = get_db()
        
        # Use a default user_id
        user_id = 'system_user'  # Use a system user that exists in the database
        # user_id = data.get('user_id', 'anonymous')
        
        # Extract position data from the request
        position_x = data.get('position_x', 500) / 1000.0  # Convert from pixels to 0-1 range
        position_y = data.get('position_y', 250) / 500.0   # Convert from pixels to 0-1 range
        
        # Use the helper function from db.py
        new_note = create_new_note(
            db=db,
            content=data['content'],
            user_id=user_id,
            color=data.get('color', 'yellow'),
            is_prompt=data.get('is_prompt', False),
            position_x=position_x,
            position_y=position_y
        )
        
        return jsonify({
            "id": new_note.note_id,
            "content": new_note.content,
            "status": "Note created successfully"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# This blueprint is not being used - leaving it here for reference
notes_bp = Blueprint('notes', __name__)

# @notes_bp.route('/notes', methods=['POST'])
# def create_note_in_notes_bp():
#     data = request.json
#     db = get_db()  # Get database session
#     
#     # Use the helper function from db.py
#     new_note = create_new_note(
#         db=db,
#         content=data['content'],
#         user_id=data['user_id'],
#         color=data.get('color', 'yellow')
#     )
#     
#     return jsonify({"note_id": new_note.note_id}), 201

@notes_bp.route('/notes/public', methods=['GET'])
def get_public_board():
    db = get_db()
    
    # Get public notes from the helper function
    notes = get_public_notes(db)
    
    # Convert to JSON-friendly format
    result = []
    for note, state in notes:
        result.append({
            "note_id": note.note_id,
            "content": note.content,
            "color": note.color,
            "position_x": state.position_x,
            "position_y": state.position_y,
            "is_prompt": note.is_prompt
        })
    
    return jsonify(result)

# Save a note to personal board
@bulletin_board.route('/notes/<int:note_id>/save', methods=['POST'])
def save_note(note_id):
    data = request.json
    
    try:
        db = get_db()
        user_id = data.get('user_id', 'system_user')  # Default to system_user
        
        print(f"Attempting to save note {note_id} to personal board for user {user_id}")
        print(f"Data received: {data}")
        
        # Ensure note_id is valid by checking if the note exists
        note_exists = db.query(Note).filter(Note.note_id == note_id).first()
        if not note_exists:
            return jsonify({"error": f"Note with ID {note_id} not found"}), 404
            
        # Save note to personal board
        state = save_note_to_personal(
            db=db,
            note_id=note_id,
            user_id=user_id,
            position_x=data.get('position_x', 0.5),
            position_y=data.get('position_y', 0.5)
        )
        
        print(f"Note successfully saved to personal board: {state}")
        
        return jsonify({
            "status": "Note saved to personal board",
            "note_id": note_id,
            "user_id": user_id
        }), 200
    except Exception as e:
        print(f"Error saving note to personal board: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Update an existing note
@bulletin_board.route('/notes/<int:note_id>', methods=['PATCH'])
def update_note(note_id):
    data = request.json

    for note in notes:
        if note['id'] == note_id:
            # Only updates the fields that are present in the request
            note['content'] = data.get('content', note['content'])
            note['color'] = data.get('color', note['color'])
            note['position_x'] = data.get('position_x', note['position_x'])
            note['position_y'] = data.get('position_y', note['position_y'])
            return jsonify(note), 200 # 200 - Ok

    return jsonify({"error": "Note not found"}), 404 # 404 - Not found

# Delete a note
@bulletin_board.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    for note in notes:
        if note['id'] == note_id:
            notes.remove(note)
            return jsonify({"status": "Note deleted"}), 200

    # If no note with the matching id is found
    return jsonify({"error": "Note not found"}), 404

#####################################################
# Prompt FUNCTIONS:
#####################################################

# Get community prompts
@bulletin_board.route('/prompts', methods=['GET'])
def get_prompts():
    return jsonify(prompts)

# Create a new prompt
@bulletin_board.route('/prompts', methods=['POST'])
def create_prompt():
    data = request.json

    # Simple validation
    if not data or 'content' not in data:
        return jsonify({"error": "Content is required"}), 400
    
    # Create a new prompt
    new_prompt = {
        'id': len(prompts) + 1,
        'content': data['content'],
        'color': data.get('color', '#FFFFF3'),
        'position_x': data.get('position_x', 0),
        'position_y': data.get('position_y', 0),
        'is_prompt': True,
        'created_at': datetime.utcnow().isoformat()
    }
    
    prompts.append(new_prompt)
    return jsonify(new_prompt), 201

# Update an existing prompt
# Not sure if we need the ability to update a prompt
# (because all the notes responding to the origninal wouldn't make sense anymore)
@bulletin_board.route('/prompts/<int:prompt_id>', methods=['PATCH'])
def update_prompt(prompt_id):
    data = request.json

    for prompt in prompts:
        if prompt['id'] == prompt_id:
            # Only updates the fields that are present in the request
            prompt['content'] = data.get('content', prompt['content'])
            prompt['color'] = data.get('color', prompt['color'])
            prompt['position_x'] = data.get('position_x', prompt['position_x'])
            prompt['position_y'] = data.get('position_y', prompt['position_y'])
            return jsonify(prompt), 200 # 200 - Ok

    return jsonify({"error": "Prompt not found"}), 404 # 404 - Not found

# Delete a prompt
# Also not sure if necessary (because there would be "ghost" notes that respond to nothing)
@bulletin_board.route('/prompts/<int:prompt_id>', methods=['DELETE'])
def delete_prompt(prompt_id):
    for prompt in prompts:
        if prompt['id'] == prompt_id:
            prompts.remove(prompt)
            return jsonify({"status": "Prompt deleted"}), 200

    # If no prompt with the matching id is found
    return jsonify({"error": "Prompt not found"}), 404

#####################################################
# Reset FUNCTIONS:
#####################################################

# Helper function for reset_board()
# Might store default prompts in the database later so this is simple right now
# For example, this might run SQL later
def get_default_prompts():
    return default_prompts

# Resets the notes list and prompts list
# Helper function for check_for_reset()
def reset_board():
    # Allows for editing notes and prompts lists
    global notes, prompts

    # Clear all notes
    notes = []

    # Reset prompts to defaults
    prompts[:] = get_default_prompts()

# Checks if it is time for a reset
# If it is, call reset_board()
def check_for_reset():
    global last_reset_date
    today = date.today()
    if today != last_reset_date:
        reset_board()
        last_reset_date = today

# Manual reset for testing purposes
@bulletin_board.route('/reset', methods=['POST'])
def manual_reset():
    reset_board()
    return jsonify({"status": "reset successful"})
#    return jsonify({"success": True}), 200
