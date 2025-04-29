"""
seed_test_data.py -- adds 20 test notes by default (5 are prompts by default)
"""

# Important Things to Note:
# Not a yoyo migration so can potentially desync your database with the rest of the group's
# To prevent this, uncomment the undo_test_data() function in main when done testing
# This deletes all the notes with the specific test id used in this program

from db import get_db, User, Note, NoteState
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
import random
import string
import math

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

    # Original code for random positioning (commented out):
    # ---------------------------------------------------------
    # for i in range(note_count):
    #     # Creates the prompts first, then creates the notes
    #     is_prompt = prompts_remaining > 0
    #     if is_prompt:
    #         prompts_remaining -= 1
    # 
    #     content = f"{'Prompt' if is_prompt else 'Note'} #{i+1}: " + random_text(30)
    # 
    #     note = Note.create(
    #         content=content,
    #         color=random.choice(["#FF7EB9", "#FEFF9C", "#7AFCFF", "#7AFF7D"]), # One of our color palette colors
    #         created_by=test_user.user_id,
    #         is_prompt=is_prompt
    #     )
    #     db.add(note)
    #     db.flush()  # Adds the auto-incremented note-id from the database to the 'note' object in the code
    # 
    #     # Randomly decide which state to make the note
    #     state_type = random.choices(
    #         ["public", "personal", "trash"],
    #         weights=[0.5, 0.3, 0.2],  # 50% for public, 30% for personal, 20% for trash
    #         k=1
    #     )[0]
    # 
    #     state = NoteState(
    #         note_id=note.note_id,
    #         state=state_type,
    #         user_id=test_user.user_id if state_type != "public" else None,
    #         position_x=round(random.uniform(0.1, 0.9), 2),
    #         position_y=round(random.uniform(0.1, 0.9), 2),
    #         z_index=random.randint(0, 10),
    #         rotation=round(random.uniform(-5, 5), 1)
    #     )
    # ---------------------------------------------------------
    
    # NEW CODE: Grid-based positioning for better note distribution
    # Calculate grid dimensions for better distribution
    # For a bulletin board with 0-1 range (displayed as 0-1000px width, 0-500px height)
    grid_cols = 5  # Number of columns in our virtual grid
    grid_rows = 4  # Number of rows in our virtual grid
    
    # Calculate cell width and height
    cell_width = 0.8 / grid_cols   # 0.8 to leave some margin (0.1 on each side)
    cell_height = 0.8 / grid_rows  # 0.8 to leave some margin (0.1 on each side)
    
    # Create a list of positions covering the grid
    positions = []
    for row in range(grid_rows):
        for col in range(grid_cols):
            # Calculate base position (top-left of cell)
            base_x = 0.1 + (col * cell_width)
            base_y = 0.1 + (row * cell_height)
            
            # Add some randomness within the cell
            x = base_x + (random.random() * cell_width * 0.8)
            y = base_y + (random.random() * cell_height * 0.8)
            
            positions.append((round(x, 2), round(y, 2)))
    
    # Shuffle positions to avoid predictable patterns
    random.shuffle(positions)

    # Handle case if we need more positions than grid cells
    while len(positions) < note_count:
        x = round(random.uniform(0.1, 0.9), 2)
        y = round(random.uniform(0.1, 0.9), 2)
        positions.append((x, y))

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

        # Get position from our pre-calculated positions list
        pos_x, pos_y = positions[i]
        
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
            position_x=pos_x,
            position_y=pos_y,
            z_index=random.randint(0, 10),
            rotation=round(random.uniform(-10, 10), 1)  # Slightly more rotation for visual interest
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
