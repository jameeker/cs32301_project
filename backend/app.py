"""
app.py -- entry point for Flask Python backend app (bulletin board web service)
initializes Flask app, configures routes, sets up CORS and blueprints components.
"""

# Import Flask framework and CORS for cross-origin requests
from flask import Flask, jsonify
from flask_cors import CORS

# Import app configuration
from config import Config

# Import database models and helper functions from our custom db module
from database.db import (
    get_db, create_new_note, Note, NoteState, User,  # Core database entities
    count_all_notes, count_notes_by_state, get_user_stats,  # Stat functions
    show_tables, show_table_schema, check_foreign_keys, get_db_size,  # DB inspection
    dump_table_data  # Data export
)

# Import API blueprints - each blueprint handles a specific area of functionality
from blueprints.bulletin_board import bulletin_board  # Public note board functionality
from blueprints.personal_board import personal_board  # User's personal notes
from blueprints.about import about  # About page information 
from blueprints.how_to import how_to  # How-to guides and instructions

def create_app(config_class=Config):
    """Function that creates and configures the Flask application"""
    # Initialize Flask app
    app = Flask(__name__)
    
    # Apply configuration from Config class
    app.config.from_object(config_class)
    
    # Enable CORS for API routes and restrict to specific origins
    # Allows frontend apps to securely access backend Flask API
    CORS(app, resources={r"/api/*": {"origins": ["http://127.0.0.1:3000", "http://our-notes.com:3000"]}})
    
    # Register API blueprints to organize routes by functionality area
    app.register_blueprint(bulletin_board)  # Main community bulletin board homepage
    app.register_blueprint(personal_board)  # Personal board page
    app.register_blueprint(about)           # About page
    app.register_blueprint(how_to)          # How-to page
    
    # Define root endpoint that provides API information and database stats
    @app.route('/')
    def home():
        """
        Gives brief info and a health check for the Flask app
        Shows API endpoints + current state of database
        """
        # Get database connection
        db = get_db()
        
        # Gather basic database statistics to display on the home endpoint
        total_notes = count_all_notes(db)           # Total number of notes in the database
        notes_by_state = count_notes_by_state(db)   # Notes broken down by state (public/personal/trash)
        user_stats = get_user_stats(db)             # User count and user activity metrics
        tables = show_tables(db)                    # List of database tables
        db_size = get_db_size(db)                   # Size of database and tables
        
        # Return all API information and stats as a JSON response object
        return {
            # API information
            "name": "Bulletin Board API",
            "version": "1.0.0",
            
            # Available API endpoints
            "endpoints": {
                "bulletin_board": "/api/bulletin-board/notes",  # Community notes
                "personal_board": "/api/personal-board/notes",  # Personal saved notes
                "about": "/api/about",                          # About information
                "how_to": "/api/how-to",                        # Usage guides
                "health": "/api/health",                        # Health check
                "db_details": "/api/db-details"                 # Database details
            },
            
            # API status
            "status": "running",
            
            # Database statistics for monitoring
            "database_stats": {
                "total_notes": total_notes,              # Total notes in system
                "notes_by_state": notes_by_state,        # Count by state (public/personal/trash)
                "user_count": user_stats["user_count"],  # Number of users
                "average_notes_per_user": round(user_stats["average_notes_per_user"], 2),  # Avg notes per user
                "tables": tables,                        # Database tables
                "total_db_size_mb": round(db_size["total_mb"], 2)  # Database size in MB
            }
        }
    
    # Health check endpoint - used for monitoring
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """
        Simple health check endpoint to verify the API is running.
        
        Used by monitoring systems to check application availability.
        
        Returns:
            JSON with health status
        """
        return {"status": "healthy"}
    
    # Return configured app
    return app

# App entry point when run directly and not imported
if __name__ == '__main__':
    # Create the Flask app
    app = create_app()
    
    # Start the development server on port 5000
    # The debug=True flag enables auto-reload on code changes
    app.run(debug=True, port=5000)
