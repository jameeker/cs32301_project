from flask import Flask
from flask_cors import CORS
from config import Config

# Import blueprints
from blueprints.bulletin_board import bulletin_board
from blueprints.personal_board import personal_board
from blueprints.about import about
from blueprints.how_to import how_to

def create_app(config_class=Config):
    # Initialize Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(bulletin_board)
    app.register_blueprint(personal_board)
    app.register_blueprint(about)
    app.register_blueprint(how_to)
    
    # Define routes
    @app.route('/')
    def home():
        return {
            "name": "Bulletin Board API",
            "version": "1.0.0",
            "endpoints": {
                "bulletin_board": "/api/bulletin-board/notes",
                "personal_board": "/api/personal-board/notes",
                "about": "/api/about",
                "how_to": "/api/how-to",
                "health": "/api/health"
            },
            "status": "running"
        }
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {"status": "healthy"}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)