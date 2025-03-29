from flask import Blueprint, jsonify, request
from datetime import datetime

# Create the blueprint
personal_board = Blueprint('personal_board', __name__, url_prefix='/api/personal-board')

# Temporary storage for personal notes
personal_notes = {}  # Will store notes by client_id

# Get personal notes
@personal_board.route('/notes', methods=['GET'])
def get_personal_notes():
    client_id = request.args.get('client_id')
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
        
    # Return notes for this client (or empty list if none exist)
    return jsonify(personal_notes.get(client_id, []))

# Save a note to personal board
@personal_board.route('/notes', methods=['POST'])
def save_note():
    data = request.json
    client_id = data.get('client_id')
    
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
        
    # Initialize client's notes if not exists
    if client_id not in personal_notes:
        personal_notes[client_id] = []
        
    new_note = {
        'id': len(personal_notes[client_id]) + 1,
        'content': data['content'],
        'color': data.get('color', '#ffd3b6'),
        'position_x': data.get('position_x', 0),
        'position_y': data.get('position_y', 0),
        'created_at': datetime.utcnow().isoformat()
    }
    
    personal_notes[client_id].append(new_note)
    return jsonify(new_note), 201