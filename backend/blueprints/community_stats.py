from flask import Blueprint, jsonify, request
from datetime import datetime

# Corrected blueprint name and URL
community_stats = Blueprint('community_board', __name__, url_prefix='/api/community_stats')

# Temporary storage (to be replaced by DB)
notes = [
    {
        'id': 1,
        'content': 'Welcome to the community board!',
        'color': '#ffd3b6',
        'position_x': 100,
        'position_y': 100,
        'created_at': datetime.utcnow().isoformat() + 'Z'
    }
]

# Get community notes
@community_stats.route('/notes', methods=['GET'])
def get_community_notes():
    return jsonify(notes)

# Create a new note
@community_stats.route('/notes', methods=['POST'])
def create_note():
    data = request.json

    # Validate
    if not data or 'content' not in data:
        return jsonify({"error": "Content is required"}), 400

    new_note = {
        'id': len(notes) + 1,
        'content': data['content'],
        'color': data.get('color', '#ffd3b6'),
        'position_x': data.get('position_x', 0),
        'position_y': data.get('position_y', 0),
        'created_at': datetime.utcnow().isoformat() + 'Z'
    }

    notes.append(new_note)
    return jsonify(new_note), 201
