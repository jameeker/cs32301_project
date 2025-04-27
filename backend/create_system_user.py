# Create system user for notes
from database.db import User, get_db
from datetime import datetime

def create_system_user():
    """Create a system user if it doesn't exist"""
    db = get_db()
    
    # Check if system_user already exists
    system_user = db.query(User).filter(User.user_id == 'system_user').first()
    
    if not system_user:
        print("Creating system user...")
        # Create system user
        system_user = User(
            user_id='system_user',
            session_token='system-token',
            user_agent='System User',
            ip_hash='system',
            theme_preference='default',
            board_background='default_corkboard.jpg'
        )
        db.add(system_user)
        db.commit()
        print("System user created successfully!")
    else:
        print("System user already exists")

if __name__ == "__main__":
    create_system_user()
