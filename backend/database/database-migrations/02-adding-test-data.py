# 02-adding-test-data.py

"""
Add test data to the bulletin board
"""

from yoyo import step

steps = [
    # 1. Insert a test user
    step("""
        INSERT INTO Users (
            user_id,
            session_token,
            user_agent,
            ip_hash
        )
        VALUES (
            'user-test-1',
            'session-token-123',
            'Mozilla/5.0',
            SHA2('127.0.0.1', 256)
        );
    """),

    # 2. Insert a test note (expires in 24 hours)
    step(f"""
        INSERT INTO Notes (
            content,
            color,
            format,
            created_at,
            expires_at,
            type,
            is_prompt,
            created_by,
            is_auto_generated
        )
        VALUES (
            'This is a test sticky note!',
            '#FEFF9C',
            'text',
            NOW(),
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            'sticky',
            FALSE,
            'user-test-1',
            FALSE
        );
    """),

    # 3. Insert a state so it shows up on the board
    step("""
        INSERT INTO Note_States (
            note_id,
            state,
            user_id,
            position_x,
            position_y,
            weather_level,
            z_index,
            rotation
        )
        VALUES (
            (SELECT note_id FROM Notes ORDER BY note_id DESC LIMIT 1),
            'public',
            NULL,
            0.4,
            0.6,
            0,
            0,
            1.5
        );
    """)
]