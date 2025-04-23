# seed_test_data.py:
# adds 20 test notes by default (5 are prompts by default)

# Important Things to Note:
# Not a yoyo migration so can potentially desync your database with the rest of the group's
# To prevent this, uncomment the undo_test_data() function in main when done testing
# This deletes all the notes with the specific test id used in this program

from db import get_db, User, Note, NoteState
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
import random
import string

def random_text(length=20):
    return ''.join(random.choices(string.ascii_letters + string.digits + " ", k=length))

def create_test_data(note_count=20, prompt_count=5):
    db = get_db()

    # Creates a variable (test_user) of type 'User' with new user information
    # If there is a user of that same name already, undo creating a new user with new info
    # Then, assign the existing user to test_user
    try:
        test_user = User(
            user_id="SEED-TEST-DATA-USER-001", # Specific id so we can find and delete to remove test data from database
            session_token="test-session-token",
            user_agent="Python/3.x",
            ip_hash="dummyhash123"
        )
        db.add(test_user)
        db.commit()
    except IntegrityError: # Error thrown by MySQL when there is a duplicate key
        db.rollback() # Undoes the operation to add a new user
        test_user = db.query(User).filter(User.user_id == "SEED-TEST-DATA-USER-001").first() #Fetches existing user from database

    notes_created = 0
    prompts_remaining = prompt_count

    for i in range(note_count):
        # Creates the prompts first, then creates the notes
        is_prompt = prompts_remaining > 0
        if is_prompt:
            prompts_remaining -= 1

        content = f"{'Prompt' if is_prompt else 'Note'} #{i+1}: " + random_text(30)

        note = Note.create(
            content=content,
            color=random.choice(["#FF7EB9", "#FEFF9C", "#7AFCFF", "#7AFF7D"]), # One of our color palette colors
            created_by=test_user.user_id,
            is_prompt=is_prompt
        )
        db.add(note)
        db.flush()  # Adds the auto-incremented note-id from the database to the 'note' object in the code

        # Randomly decide which state to make the note
        state_type = random.choices(
            ["public", "personal", "trash"],
            weights=[0.5, 0.3, 0.2],  # 50% for public, 30% for personal, 20% for trash
            k=1
        )[0]

        state = NoteState(
            note_id=note.note_id,
            state=state_type,
            user_id=test_user.user_id if state_type != "public" else None,
            position_x=round(random.uniform(0.1, 0.9), 2),
            position_y=round(random.uniform(0.1, 0.9), 2),
            z_index=random.randint(0, 10),
            rotation=round(random.uniform(-5, 5), 1)
        )
        db.add(state)
        notes_created += 1

    db.commit()
    print(f"Inserted {notes_created} test notes:")
    print(f"   - Prompts: {prompt_count}")
    print(f"   - Regular notes: {note_count - prompt_count}")

# Deletes all notes related to user: SEED-TEST-DATA-USER-001
def undo_test_data():
    db = get_db()
    db.query(User).filter(User.user_id == "SEED-TEST-DATA-USER-001").delete()
    db.commit()
    print("Test data removed. (notes created by user: \"SEED-TEST-DATA-USER-001\" removed)")


if __name__ == "__main__":
    create_test_data(note_count=20, prompt_count=5)

    # Uncomment the following to remove test data from the db for the user: "SEED-TEST-DATA-USER-001"
    #undo_test_data()

