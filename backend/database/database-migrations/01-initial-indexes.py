# 01-initial-indexes.py

"""
Add performance indexes
"""

from yoyo import step

steps = [
    step("""
        CREATE INDEX index_notes_prompt_id ON Notes(prompt_id);
    """),
    step("""
        CREATE INDEX index_note_states_user_state ON Note_States(user_id, state);
    """),
    step("""
        CREATE INDEX index_note_states_note_id ON Note_States(note_id);
    """),
    step("""
        CREATE INDEX index_notes_created_at ON Notes(created_at);
    """)
]