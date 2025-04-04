from flask import Blueprint, jsonify, request
from datetime import datetime, date

# Create the blueprint
bulletin_board = Blueprint('bulletin_board', __name__, url_prefix='/api/bulletin-board')

# Used to keep track of when to reset the board
last_reset_date = date.today()

#last_reset_date = date(2025, 1, 1) # Used to test the check_for_reset() by setting the last_reset_date to an earlier date

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
        'content': "What’s on your mind today?",
        'color': "#FFFFF3",
        'position_x': 50,
        'position_y': 100
    },
    {
        'id': 2,
        'content': "Write the world a story!",
        'color': "#FFFFF3",
        'position_x': 200,
        'position_y': 100
    },
    {
        'id': 3,
        'content': "Share a random thought.",
        'color': "#FFFFF3",
        'position_x': 350,
        'position_y': 100
    }
]

# A list of default prompts (hard coded right now) to be added to prompts in the reset_board() function
default_prompts = [
    {
        'id': 1,
        'content': "DEFAULT PROMPT 1. (should be put into prompts after board reset)",
        'color': "#FFFFF3",
        'position_x': 700,
        'position_y': 200
    },
    {
        'id': 2,
        'content': "DEFAULT PROMPT 2. (should be put into prompts after board reset)",
        'color': "#FFFFF3",
        'position_x': 200,
        'position_y': 500
    }
]

#####################################################
# Note FUNCTIONS:
#####################################################

# Get community notes
# Checks if its time for a board reset every time this is called
@bulletin_board.route('/notes', methods=['GET'])
def get_community_notes():
    check_for_reset()
    return jsonify(notes)

# Create a new note
@bulletin_board.route('/notes', methods=['POST'])
def create_note():
    data = request.json
    
    # Simple validation
    if not data or 'content' not in data:
        return jsonify({"error": "Content is required"}), 400
    
    # Create a new note
    new_note = {
        'id': len(notes) + 1,
        'content': data['content'],
        'color': data.get('color', '#ffd3b6'),
        'position_x': data.get('position_x', 0),
        'position_y': data.get('position_y', 0),
        'created_at': datetime.utcnow().isoformat()
    }
    
    notes.append(new_note)
    return jsonify(new_note), 201

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
        'created_at': datetime.utcnow().isoformat()
    }
    
    prompts.append(new_prompt)
    return jsonify(new_prompt), 201

#####################################################
# Reset FUNCTIONS:
#####################################################

# Helper function for reset_board()
# Might store default prompts in the database later so that is why this is so simple right now
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


