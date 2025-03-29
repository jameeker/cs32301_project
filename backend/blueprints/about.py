from flask import Blueprint, jsonify

# Create the blueprint
about = Blueprint('about', __name__, url_prefix='/api/about')

# Get about information
@about.route('', methods=['GET'])
def get_about():
    about_info = {
        'title': 'Anonymous Bulletin Board',
        'description': 'An interactive, anonymous online community bulletin board where users can leave messages and interact with others freely. Everything expires in 24 hours.',
        'version': '1.0.0'
    }
    return jsonify(about_info)