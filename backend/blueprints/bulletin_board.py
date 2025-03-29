from flask import Blueprint, jsonify, request
from datetime import datetime

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