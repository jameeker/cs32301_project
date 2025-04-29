-- schema.sql
-- Core table definitions for MySQL 8.0+

CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,                             -- user_id: Unique identifier for each anonymous user session (typically a UUID)
    session_token VARCHAR(255) UNIQUE NOT NULL,                   -- session_token: Token stored in browser cookies/localStorage to identify returning users
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,      -- created_at: When this anonymous session was first created
    last_active TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,     -- last_active: Last time this user interacted with the system (for timeout/cleanup)
    user_agent VARCHAR(255),                                      -- user_agent: Browser/device information for analytics and debugging
    ip_hash VARCHAR(64),                                          -- ip_hash: Hashed IP address for rate limiting without storing PII
    theme_preference VARCHAR(50) DEFAULT 'default',               -- theme_preference: User's chosen theme for their personal space
    board_background VARCHAR(255) DEFAULT 'default_corkboard.jpg' -- board_background: Background image for personal board
);

CREATE TABLE Notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,                  -- note_id: Unique identifier for each note
    content TEXT NOT NULL,                                   -- content: The text content of the note (can be limited in React frontend app code)
    color VARCHAR(20) NOT NULL DEFAULT 'yellow',             -- color: Visual color of the sticky note
    format VARCHAR(20) DEFAULT 'text',                       -- format: Formatting type (plain text, ASCII art, etc.)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- created_at: Time when the note was first created
    expires_at TIMESTAMP NOT NULL,                           -- expires_at: Time when public notes expire (24 hours after creation)
    type ENUM('sticky', 'poster') NOT NULL DEFAULT 'sticky', -- ENUM: Small sticky note vs. large poster/prompt
    is_prompt BOOLEAN NOT NULL DEFAULT FALSE,                -- is_prompt: Whether or not a note serves as a prompt for others
    prompt_id INT,                                           -- prompt_id: References another note if this is a response
    created_by VARCHAR(255) NOT NULL,                        -- created_by: The anonymous user who created this note
    is_auto_generated BOOLEAN NOT NULL DEFAULT FALSE,        -- is_auto_generated: Pre-generated prompts vs. user-created ones
    
    -- Ensures referring to valid parent notes and users
    FOREIGN KEY (prompt_id) REFERENCES Notes(note_id) ON DELETE SET NULL, -- If parent note is deleted, this becomes a standalone note
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE  -- If user is removed, their notes are removed
);

CREATE TABLE Note_States (
    state_id INT AUTO_INCREMENT PRIMARY KEY,                        -- state_id: Unique identifier for each note state
    note_id INT NOT NULL,                                           -- note_id: Which note this state applies to
    state ENUM('public', 'personal', 'trash', 'archived') NOT NULL, -- ENUM: Current location/state of the note
    user_id VARCHAR(255),                                           -- user_id: Which user has this note in this state (NULL for public notes)
    position_x FLOAT DEFAULT 0.5,                                   -- position_x: Horizontal position on board (0.0 to 1.0 or pixels)
    position_y FLOAT DEFAULT 0.5,                                   -- position_y: Vertical position on board (0.0 to 1.0 or pixels)
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,          -- added_at: When the note was added to this state
    weather_level INT NOT NULL DEFAULT 0,                           -- weather_level: Visual aging effect (0=new, 10=very weathered)
    z_index INT DEFAULT 0,                                          -- z_index: Stacking order for overlapping notes
    rotation FLOAT DEFAULT 0,                                       -- rotation: Visual rotation in degrees for natural look
    
    -- Relationships to other tables
    FOREIGN KEY (note_id) REFERENCES Notes(note_id) ON DELETE CASCADE, -- If note is deleted, all its states are removed
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE, -- If user is deleted, their note states are removed
    
    -- Prevent duplicate states for the same note/user combination
    CONSTRAINT unique_note_state_user UNIQUE (note_id, state, user_id) -- Each note can only be in each state once per user
);