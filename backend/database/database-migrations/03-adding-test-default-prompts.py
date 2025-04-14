# 03-adding-test-default-prompts

"""
Adds 3 test default prompts for the bulletin board
"""

# Can use this same format later to add the real default prompts or
# consider doing something else.

from yoyo import step

steps = [
    # Uses user-test-1 from previous migration (02-adding-test-data.py)

    # Prompt 1: What’s on your mind today?
    step("""
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
            'What’s on your mind today?',
            '#FFFFF3',
            'text',
            NOW(),
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            'poster',
            TRUE,
            'user-test-1',
            TRUE
        );
    """),
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
            0.2,
            0.15,
            0,
            1,
            0
        );
    """),

    # Prompt 2: Write the world a story!
    step("""
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
            'Write the world a story!',
            '#FFFFF3',
            'text',
            NOW(),
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            'poster',
            TRUE,
            'user-test-1',
            TRUE
        );
    """),
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
            0.15,
            0,
            1,
            -1.0
        );
    """),

    # Prompt 3: Share a random thought.
    step("""
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
            'Share a random thought.',
            '#FFFFF3',
            'text',
            NOW(),
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            'poster',
            TRUE,
            'user-test-1',
            TRUE
        );
    """),
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
            0.6,
            0.15,
            0,
            1,
            2.0
        );
    """)
]