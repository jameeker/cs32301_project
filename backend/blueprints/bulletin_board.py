from flask import Blueprint, jsonify, request
from datetime import datetime

# Create the blueprint
bulletin_board = Blueprint('bulletin_board', __name__, url_prefix='/api/bulletin-board')

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

#####################################################
# Note FUNCTIONS:
#####################################################

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


