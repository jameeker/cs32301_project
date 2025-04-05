from flask import Blueprint, jsonify, request
from datetime import datetime
from database.db import get_db, create_new_note, get_public_notes, save_note_to_personal

# Create the blueprint
bulletin_board = Blueprint('bulletin_board', __name__, url_prefix='/api/bulletin-board')

# Temporary storage (will be replaced with database models later)
notes = [
    {
        'id': 1,
        'content': 'Welcome to the Bulletin Board!',
        'color': '#ffd3b6',
        'position_x': 100,
        'position_y': 100,
        'created_at': datetime.utcnow().isoformat()
    }
]

# Get community notes
@bulletin_board.route('/notes', methods=['GET'])
def get_community_notes():
    return jsonify(notes)

# # Create a new note
# @bulletin_board.route('/notes', methods=['POST'])
# def create_note():
#     data = request.json
    
#     # Simple validation
#     if not data or 'content' not in data:
#         return jsonify({"error": "Content is required"}), 400
    
#     # Create a new note
#     new_note = {
#         'id': len(notes) + 1,
#         'content': data['content'],
#         'color': data.get('color', '#ffd3b6'),
#         'position_x': data.get('position_x', 0),
#         'position_y': data.get('position_y', 0),
#         'created_at': datetime.utcnow().isoformat()
#     }
    
#     notes.append(new_note)
#     return jsonify(new_note), 201

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/notes', methods=['POST'])
def create_note():
    data = request.json
    db = get_db()  # Get database session
    
    # Use the helper function from db.py
    new_note = create_new_note(
        db=db,
        content=data['content'],
        user_id=data['user_id'],
        color=data.get('color', 'yellow')
    )
    
    return jsonify({"note_id": new_note.note_id}), 201

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

@notes_bp.route('/notes/<int:note_id>/save', methods=['POST'])
def save_note(note_id):
    data = request.json
    db = get_db()
    
    # Save note to personal board
    state = save_note_to_personal(
        db=db,
        note_id=note_id,
        user_id=data['user_id'],
        position_x=data.get('position_x', 0.5),
        position_y=data.get('position_y', 0.5)
    )
    
    return jsonify({"success": True}), 200