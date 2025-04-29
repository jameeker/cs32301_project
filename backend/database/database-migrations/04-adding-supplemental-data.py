# 04-adding-supplemental-data.py

"""
Add 15 supplemental public notes from 5 different users,
each responding to one of the 3 default prompts
"""

from yoyo import step

steps = [

    # 0. Store prompt IDs in variables (split into individual steps)
    step("""
        SELECT MIN(note_id) INTO @prompt1 FROM Notes WHERE is_prompt = TRUE;
    """),

    step("""
        SELECT MIN(note_id) + 1 INTO @prompt2 FROM Notes WHERE is_prompt = TRUE;
    """),

    step("""
        SELECT MIN(note_id) + 2 INTO @prompt3 FROM Notes WHERE is_prompt = TRUE;
    """),

    # 1. Create 5 new users
    step("""
        INSERT INTO Users (user_id, session_token, user_agent, ip_hash)
        VALUES
        ('user-2', 'token-2', 'Mozilla/5.0', SHA2('ip2', 256)),
        ('user-3', 'token-3', 'Mozilla/5.0', SHA2('ip3', 256)),
        ('user-4', 'token-4', 'Mozilla/5.0', SHA2('ip4', 256)),
        ('user-5', 'token-5', 'Mozilla/5.0', SHA2('ip5', 256)),
        ('user-6', 'token-6', 'Mozilla/5.0', SHA2('ip6', 256));
    """),

    # 2. Insert notes from each user using the @prompt variables

    # --- user-2 ---
    step("""
        INSERT INTO Notes (content, color, format, created_at, expires_at, type, is_prompt, prompt_id, created_by, is_auto_generated)
        VALUES
        ('Feeling pretty good today, thanks for asking.', '#FF7EB9', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt1, 'user-2', FALSE),
        ('There once was a cat who ruled the moon.', '#7AFCFF', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt2, 'user-2', FALSE),
        ('Pineapple does belong on pizza.', '#7AFF7D', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt3, 'user-2', FALSE);
    """),
    step("""
        INSERT INTO Note_States (note_id, state, user_id, position_x, position_y, weather_level, z_index, rotation)
        SELECT note_id, 'public', NULL,
            ROUND(RAND() * 0.8 + 0.1, 2),
            ROUND(RAND() * 0.6 + 0.3, 2),
            0, 1, ROUND(RAND() * 10 - 5, 1)
        FROM Notes WHERE created_by = 'user-2' ORDER BY note_id DESC LIMIT 3;
    """),

    # --- user-3 ---
    step("""
        INSERT INTO Notes (content, color, format, created_at, expires_at, type, is_prompt, prompt_id, created_by, is_auto_generated)
        VALUES
        ('Feeling overwhelmed, but hopeful.', '#FF7EB9', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt1, 'user-3', FALSE),
        ('A robot woke up and asked: "What is love?"', '#7AFCFF', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt2, 'user-3', FALSE),
        ('One of my socks vanished again...', '#7AFF7D', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt3, 'user-3', FALSE);
    """),
    step("""
        INSERT INTO Note_States (note_id, state, user_id, position_x, position_y, weather_level, z_index, rotation)
        SELECT note_id, 'public', NULL,
            ROUND(RAND() * 0.8 + 0.1, 2),
            ROUND(RAND() * 0.6 + 0.3, 2),
            0, 1, ROUND(RAND() * 10 - 5, 1)
        FROM Notes WHERE created_by = 'user-3' ORDER BY note_id DESC LIMIT 3;
    """),

    # --- user-4 ---
    step("""
        INSERT INTO Notes (content, color, format, created_at, expires_at, type, is_prompt, prompt_id, created_by, is_auto_generated)
        VALUES
        ('Today is just... quiet.', '#FF7EB9', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt1, 'user-4', FALSE),
        ('The tree whispered secrets to the wind.', '#7AFCFF', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt2, 'user-4', FALSE),
        ('Sometimes I wish the sky was green.', '#7AFF7D', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt3, 'user-4', FALSE);
    """),
    step("""
        INSERT INTO Note_States (note_id, state, user_id, position_x, position_y, weather_level, z_index, rotation)
        SELECT note_id, 'public', NULL,
            ROUND(RAND() * 0.8 + 0.1, 2),
            ROUND(RAND() * 0.6 + 0.3, 2),
            0, 1, ROUND(RAND() * 10 - 5, 1)
        FROM Notes WHERE created_by = 'user-4' ORDER BY note_id DESC LIMIT 3;
    """),

    # --- user-5 ---
    step("""
        INSERT INTO Notes (content, color, format, created_at, expires_at, type, is_prompt, prompt_id, created_by, is_auto_generated)
        VALUES
        ('Just grateful to be here.', '#FF7EB9', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt1, 'user-5', FALSE),
        ('"She opened the journal, and it blinked."', '#7AFCFF', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt2, 'user-5', FALSE),
        ('Bananas and ketchup are surprisingly good.', '#7AFF7D', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt3, 'user-5', FALSE);
    """),
    step("""
        INSERT INTO Note_States (note_id, state, user_id, position_x, position_y, weather_level, z_index, rotation)
        SELECT note_id, 'public', NULL,
            ROUND(RAND() * 0.8 + 0.1, 2),
            ROUND(RAND() * 0.6 + 0.3, 2),
            0, 1, ROUND(RAND() * 10 - 5, 1)
        FROM Notes WHERE created_by = 'user-5' ORDER BY note_id DESC LIMIT 3;
    """),

    # --- user-6 ---
    step("""
        INSERT INTO Notes (content, color, format, created_at, expires_at, type, is_prompt, prompt_id, created_by, is_auto_generated)
        VALUES
        ('Honestly, I needed this prompt today.', '#FF7EB9', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt1, 'user-6', FALSE),
        ('In a world without stars, she lit a candle.', '#7AFCFF', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt2, 'user-6', FALSE),
        ('I forgot what I was doing halfway through.', '#7AFF7D', 'text', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 'sticky', FALSE, @prompt3, 'user-6', FALSE);
    """),
    step("""
        INSERT INTO Note_States (note_id, state, user_id, position_x, position_y, weather_level, z_index, rotation)
        SELECT note_id, 'public', NULL,
            ROUND(RAND() * 0.8 + 0.1, 2),
            ROUND(RAND() * 0.6 + 0.3, 2),
            0, 1, ROUND(RAND() * 10 - 5, 1)
        FROM Notes WHERE created_by = 'user-6' ORDER BY note_id DESC LIMIT 3;
    """)
]

