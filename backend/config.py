import os

class Config:
    # Flask settings
    SECRET_KEY = 'dev-key-for-development-only'
    DEBUG = True
    
    # Database settings (we'll start with SQLite for simplicity)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///bulletin_board.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # CORS settings to allow frontend access
    CORS_HEADERS = 'Content-Type'