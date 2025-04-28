from flask import Blueprint, jsonify

# Create the how-to blueprint
how_to = Blueprint('how_to', __name__, url_prefix='/api/how-to')

# how-to information getter function
@how_to.route('', methods=['GET'])
def get_how_to():
    how_to_info = {
        'steps': [
            'Click on the bulletin board to add a new note',
            'Choose a color for your note',
            'Write your message (limit: 200 characters)',
            'Click "Place Note" to add it to the board',
            'Notes expire after 24 hours',
            'You can save notes to your personal board'
        ]
    }
    return jsonify(how_to_info)