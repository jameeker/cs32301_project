# Tests database operations: create_new_note(), remove_note(), modify_note(), filter_notes()
from db import get_db, filter_notes, create_new_note, modify_note, remove_note
from datetime import datetime, timedelta

db = get_db()

# ----------------------------------------------------------- #
#                   TESTING create_new_note()
# ----------------------------------------------------------- #
print("\n--- Creating a test note ---")
test_note = create_new_note(
    db=db,
    content="Temporary test note for removal",
    user_id="user-test-1",
    color="#FFFF00"
)
print(f"Created note ID: {test_note.note_id}, content: {test_note.content}")

# Save original content for later comparison
original_content = test_note.content

# ----------------------------------------------------------- #
#                  TESTING filter_notes()
# ----------------------------------------------------------- #

print("\n--- Filter: All notes from user-3 ---")
notes = filter_notes(db, user_id="user-3")
for note in notes:
    print(f"[{note.created_by}] {note.content}")

print("\n--- Filter: Notes containing the word 'pizza' ---")
notes = filter_notes(db, text_contains="pizza")
for note in notes:
    print(f"[{note.created_by}] {note.content}")

print("\n--- Filter: Notes with color #FF7EB9 (pink) ---")
notes = filter_notes(db, color="#FF7EB9")
for note in notes:
    print(f"[{note.created_by}] {note.content} - {note.color}")

print("\n--- Filter: Notes created in the last 2 hours ---")
recent_time = datetime.utcnow() - timedelta(hours=2)
notes = filter_notes(db, created_after=recent_time)
for note in notes:
    print(f"[{note.created_by}] {note.content} - {note.created_at}")

print("\n--- Filter: Notes created before now (should show all in database) ---")
notes = filter_notes(db, created_before=datetime.utcnow())
for note in notes:
    print(f"[{note.created_by}] {note.content}")

# Position filter — might be empty if random pos_x/y are out of range
print("\n--- Filter: Notes within screen bounds (0.2 ≤ x ≤ 0.8, 0.3 ≤ y ≤ 0.9) ---")
notes = filter_notes(db, within_bounds=(0.2, 0.8, 0.3, 0.9))
for note in notes:
    print(f"[{note.created_by}] {note.content} (filtered by position)")

# ----------------------------------------------------------- #
#                   TESTING modify_note()
# ----------------------------------------------------------- #
print("\n--- Modifying the test note's content ---")
new_content = "Updated test note content after modification"
modified = modify_note(db, note_id=test_note.note_id, new_content=new_content, user_id="user-test-1")
print(f"Note modified: {modified}")

# Confirm the content was actually changed
print("\n--- Verifying note content update ---")
notes = filter_notes(db, text_contains="Updated test note content after modification")
if notes:
    print("Modification confirmed:")
    for note in notes:
        print(f"  - {note.content}")
else:
    print("Note modification not found.")

# ----------------------------------------------------------- #
#                   TESTING remove_note()
# ----------------------------------------------------------- #
print("\n--- Removing the test note ---")
result = remove_note(db, test_note.note_id, user_id="user-test-1")
print(f"Note removed: {result}")

# Confirm removal
print("\n--- Verifying test note removal ---")
check = filter_notes(db, text_contains="Temporary test note for removal")
if not check:
    print("Test note successfully removed.")
else:
    print("Test note still exists!")

db.close()
