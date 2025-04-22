# 00-initial-schema.py

"""
Create initial schema for the bulletin board
"""

from yoyo import step

steps = [
    step("""
        CREATE TABLE Users (
            user_id VARCHAR(255) PRIMARY KEY,
            session_token VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            last_active TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_agent VARCHAR(255),
            ip_hash VARCHAR(64),
            theme_preference VARCHAR(50) DEFAULT 'default',
            board_background VARCHAR(255) DEFAULT 'default_corkboard.jpg'
        );
    """),
    step("""
        CREATE TABLE Notes (
            note_id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL,
            color VARCHAR(20) NOT NULL DEFAULT 'yellow',
            format VARCHAR(20) DEFAULT 'text',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL,
            type ENUM('sticky', 'poster') NOT NULL DEFAULT 'sticky',
            is_prompt BOOLEAN NOT NULL DEFAULT FALSE,
            prompt_id INT,
            created_by VARCHAR(255) NOT NULL,
            is_auto_generated BOOLEAN NOT NULL DEFAULT FALSE,
            
            FOREIGN KEY (prompt_id) REFERENCES Notes(note_id) ON DELETE SET NULL,
            FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
        );
    """),
    step("""
        CREATE TABLE Note_States (
            state_id INT AUTO_INCREMENT PRIMARY KEY,
            note_id INT NOT NULL,
            state ENUM('public', 'personal', 'trash', 'archived') NOT NULL,
            user_id VARCHAR(255),
            position_x FLOAT DEFAULT 0.5,
            position_y FLOAT DEFAULT 0.5,
            added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            weather_level INT NOT NULL DEFAULT 0,
            z_index INT DEFAULT 0,
            rotation FLOAT DEFAULT 0,
            
            FOREIGN KEY (note_id) REFERENCES Notes(note_id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            
            CONSTRAINT unique_note_state_user UNIQUE (note_id, state, user_id)
        );
    """)
]