-- indexes.sql
-- Core indexes for the Anonymous Bulletin Board application

-- index_notes_prompt_id: Finding responses to a specific prompt
CREATE INDEX index_notes_prompt_id ON Notes(prompt_id);

-- index_note_states_user_state: quickly retrieving a user's notes by state (personal board, trash, etc.)
CREATE INDEX index_note_states_user_state ON Note_States(user_id, state);

-- index_note_states_note_id: efficiently access all states of a specific note
CREATE INDEX index_note_states_note_id ON Note_States(note_id);

-- Find notes by creation date (for time-based displays)
CREATE INDEX index_notes_created_at ON Notes(created_at);