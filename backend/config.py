import os

class Config:
    # Flask settings
    SECRET_KEY = 'dev-key-for-development-only'
    DEBUG = True
    
    # Database settings
    SQLALCHEMY_DATABASE_URI = 'sqlite:///bulletin_board.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # CORS settings to allow access for React frontend app
    CORS_HEADERS = 'Content-Type'