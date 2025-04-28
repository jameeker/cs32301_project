from flask import Blueprint, jsonify, request
from datetime import datetime
from database.db import get_db, get_personal_notes, move_note_to_trash, get_trashed_notes

# Create the blueprint
personal_board = Blueprint('personal_board', __name__, url_prefix='/api/personal-board')

# Get personal notes
@personal_board.route('/notes', methods=['GET'])
def get_user_personal_notes():
    client_id = request.args.get('client_id')
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
    
    try:
        db = get_db()
        
        # Get both the user's notes and system_user notes
        # This way we'll show both types of archived notes
        user_notes = get_personal_notes(db, client_id)
        system_notes = get_personal_notes(db, 'system_user')
        
        # Combine all notes and format them for the frontend
        result = []
        
        # Format and add the notes
        for note, state in user_notes + system_notes:
            result.append({
                'id': note.note_id,
                'content': note.content,
                'color': note.color,
                'position_x': state.position_x * 1000,  # Convert from 0-1 range to pixels
                'position_y': state.position_y * 500,   # Adjust as needed
                'created_at': note.created_at.isoformat() if note.created_at else None
            })
        
        return jsonify(result)
    except Exception as e:
        print(f"Error fetching personal notes: {str(e)}")
        return jsonify({"error": f"Failed to load notes: {str(e)}"}), 500

# Get trashed notes
@personal_board.route('/trash', methods=['GET'])
def get_user_trashed_notes():
    client_id = request.args.get('client_id')
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
    
    try:
        db = get_db()
        
        # Get both the user's trashed notes and system_user trashed notes
        user_notes = get_trashed_notes(db, client_id)
        system_notes = get_trashed_notes(db, 'system_user')
        
        # Combine all notes and format them for the frontend
        result = []
        
        # Format and add the notes
        for note, state in user_notes + system_notes:
            result.append({
                'id': note.note_id,
                'content': note.content,
                'color': note.color,
                'created_at': note.created_at.isoformat() if note.created_at else None
            })
        
        return jsonify(result)
    except Exception as e:
        print(f"Error fetching trashed notes: {str(e)}")
        return jsonify({"error": f"Failed to load trashed notes: {str(e)}"}), 500

# Move a note to trash
@personal_board.route('/notes/<int:note_id>/trash', methods=['POST'])
def trash_note(note_id):
    data = request.json
    client_id = data.get('client_id')
    
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
    
    try:
        db = get_db()
        
        # Move the note to trash
        trash_state = move_note_to_trash(
            db=db,
            note_id=note_id,
            user_id=client_id
        )
        
        return jsonify({
            "status": "Note moved to trash",
            "note_id": note_id
        }), 200
    except Exception as e:
        print(f"Error trashing note: {str(e)}")
        return jsonify({"error": f"Failed to trash note: {str(e)}"}), 500

# Save a note to personal board directly
@personal_board.route('/notes', methods=['POST'])
def save_note():
    from database.db import create_new_note, save_note_to_personal
    
    data = request.json
    client_id = data.get('client_id')
    
    if not client_id:
        return jsonify({"error": "Client ID required"}), 400
    
    try:
        db = get_db()
        
        # Create a new note
        new_note = create_new_note(
            db=db,
            content=data['content'],
            user_id=client_id,
            color=data.get('color', '#ffd3b6'),
            is_prompt=False
        )
        
        # Save it to the personal board
        state = save_note_to_personal(
            db=db,
            note_id=new_note.note_id,
            user_id=client_id,
            position_x=data.get('position_x', 0.5) / 1000,  # Convert from pixels to 0-1 range
            position_y=data.get('position_y', 0.5) / 500    # Adjust as needed
        )
        
        return jsonify({
            'id': new_note.note_id,
            'content': new_note.content,
            'color': new_note.color,
            'position_x': state.position_x * 1000,
            'position_y': state.position_y * 500,
            'created_at': new_note.created_at.isoformat()
        }), 201
    except Exception as e:
        print(f"Error saving note: {str(e)}")
        return jsonify({"error": f"Failed to save note: {str(e)}"}), 500
