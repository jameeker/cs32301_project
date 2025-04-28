# db.py - Python file with all the SQLAlchemy connection and tables (called 'models') to interact with our database
import configparser
import os
from datetime import datetime, timedelta

# SQLAlchemy imports - these are the core SQLAlchemy components we need
from sqlalchemy import text, func
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, scoped_session

# Read database configuration from yoyo.ini file
config = configparser.ConfigParser()
ini_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'yoyo.ini')
config.read(ini_path)
DATABASE_URL = config['DEFAULT']['database']

# Create a SQLAlchemy engine which connects to the hic_project MySQL database
# Adjust pool settings to prevent connection timeouts
# - pool_pre_ping: Test connections before use
# - pool_recycle: Recycle connections after 3600 seconds (1 hour)
# - pool_size: Increase max connections
# - max_overflow: Allow more overflow connections
# - pool_timeout: Longer timeout when waiting for connection
# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True,  # Test connection before use to avoid stale connections
#     pool_recycle=3600,   # Recycle connections after 1 hour
#     pool_size=20,        # Increase from default 5
#     max_overflow=20,     # Increase from default 10
#     pool_timeout=60      # Increase timeout to 60 seconds
# )
engine = create_engine(DATABASE_URL)

# Create session factory - this lets you create sessions to talk to the database
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

# Create base class for models - all table classes will inherit from this base class
Base = declarative_base()

# Defined database models (tables) as Python classes
# (!) Each class = one database table (!)
# Columns - each one matches a column in the MySQL table
# __tablename__    = "Users" # Table name
class User(Base):
    __tablename__    = "Users"
    user_id          = Column(String(255), primary_key=True)
    session_token    = Column(String(255), unique=True, nullable=False)
    created_at       = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_active      = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_agent       = Column(String(255))
    ip_hash          = Column(String(64))
    theme_preference = Column(String(50), default="default")
    board_background = Column(String(255), default="default_corkboard.jpg")

class Note(Base):
    __tablename__     = "Notes"
    note_id           = Column(Integer, primary_key=True, autoincrement=True)
    content           = Column(Text, nullable=False)
    color             = Column(String(20), default="yellow", nullable=False)
    format            = Column(String(20), default="text")
    created_at        = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at        = Column(DateTime, nullable=False)
    type              = Column(Enum("sticky", "poster", name="note_type"), default="sticky", nullable=False)
    is_prompt         = Column(Boolean, default=False, nullable=False)
    prompt_id         = Column(Integer, ForeignKey("Notes.note_id", ondelete="SET NULL"))
    created_by        = Column(String(255), ForeignKey("Users.user_id", ondelete="CASCADE"), nullable=False)
    is_auto_generated = Column(Boolean, default=False, nullable=False)
    
    # Define a relationship to allow easy access to the note creator and its note states
    creator = relationship("User", backref="notes")
    states = relationship("NoteState", backref="note", cascade="all, delete-orphan")
    
    # Helper function to calculate expiration time
    @classmethod
    def create(cls, **kwargs):
        if 'expires_at' not in kwargs:
            kwargs['expires_at'] = datetime.utcnow() + timedelta(hours=24)
        return cls(**kwargs)

class NoteState(Base):
    __tablename__ = "Note_States"
    state_id      = Column(Integer, primary_key=True, autoincrement=True)
    note_id       = Column(Integer, ForeignKey("Notes.note_id", ondelete="CASCADE"), nullable=False)
    state         = Column(Enum("public", "personal", "trash", "archived", name="state_type"), nullable=False)
    user_id       = Column(String(255), ForeignKey("Users.user_id", ondelete="CASCADE"))
    position_x    = Column(Float, default=0.5)
    position_y    = Column(Float, default=0.5)
    added_at      = Column(DateTime, default=datetime.utcnow, nullable=False)
    weather_level = Column(Integer, default=0, nullable=False)
    z_index       = Column(Integer, default=0)
    rotation      = Column(Float, default=0)
    
    # Define relationship to access user
    user = relationship("User", backref="note_states")

# Helper functions to make database operations easier ########################################################################
def get_db():
    """Get a database session"""
    db = Session()
    try:
        return db
    finally:
        # Make sure to close when done - this will be called when your Flask app tears down
        db.close()

# Database operations - Simple functions for common tasks ######################################################
def create_new_note(db, content, user_id, color="yellow", is_prompt=False, prompt_id=None, position_x=0.5, position_y=0.5):
    """Create a new note and add it to the public board"""
    # Create the note object - this is using the SQLAlchemy ORM
    new_note = Note.create(
        content=content,
        color=color,
        created_by=user_id,
        is_prompt=is_prompt,
        prompt_id=prompt_id
    )
    
    # Add to database and get ID
    db.add(new_note)
    db.flush()  # This gets the ID without committing
    
    # Create public state for the note
    public_state = NoteState(
        note_id=new_note.note_id,
        state="public",
        position_x=position_x,
        position_y=position_y
    )
    db.add(public_state)
    
    # Update user's last active timestamp
    user = db.query(User).filter(User.user_id == user_id).first()
    
    # If user exists, update timestamp - if not, create a user
    if user:
        user.last_active = datetime.utcnow()
    else:
        # Create a temporary user if it doesn't exist (for anonymous notes)
        new_user = User(
            user_id=user_id,
            session_token=f"temp-{datetime.utcnow().timestamp()}",
            user_agent="Anonymous",
            ip_hash="anonymous"
        )
        db.add(new_user)
    
    # Save all changes
    db.commit()
    return new_note

def get_public_notes(db):
    """Get all active notes on the public board"""
    # This query joins Notes and Note_States tables - using SQLAlchemy's query builder
    return (db.query(Note, NoteState)
            .join(NoteState)
            .filter(NoteState.state == "public")
            .filter(Note.expires_at > datetime.utcnow())
            .order_by(Note.is_prompt.desc(), NoteState.z_index.asc(), Note.created_at.desc())
            .all())

def save_note_to_personal(db, note_id, user_id, position_x=0.5, position_y=0.5):
    """Save a note from public board to user's personal board"""
    personal_state = NoteState(
        note_id=note_id,
        state="personal",
        user_id=user_id,
        position_x=position_x,
        position_y=position_y
    )
    db.add(personal_state)
    db.commit()
    return personal_state

def get_personal_notes(db, user_id):
    """Get all notes on a user's personal board"""
    return (db.query(Note, NoteState)
            .join(NoteState)
            .filter(NoteState.state == "personal")
            .filter(NoteState.user_id == user_id)
            .order_by(Note.is_prompt.desc(), NoteState.z_index.asc())
            .all())

def get_trashed_notes(db, user_id):
    """Get all notes in a user's trash"""
    return (db.query(Note, NoteState)
            .join(NoteState)
            .filter(NoteState.state == "trash")
            .filter(NoteState.user_id == user_id)
            .order_by(NoteState.added_at.desc())
            .all())

def move_note_to_trash(db, note_id, user_id):
    """Move a note from personal board to trash"""
    # First, remove from personal board
    db.query(NoteState)\
      .filter(NoteState.note_id == note_id)\
      .filter(NoteState.user_id == user_id)\
      .filter(NoteState.state == "personal")\
      .delete()
    
    # Then add to trash
    trash_state = NoteState(
        note_id=note_id,
        state="trash",
        user_id=user_id
    )
    db.add(trash_state)
    db.commit()
    return trash_state

def remove_note(db, note_id, user_id=None):
    """Remove a note from the database.
    
    Args:
        db: Active database session
        note_id: The ID of the note to delete
        user_id: Optional. If provided, verify the user is the creator.
    
    Returns:
        True if deleted, False if not found or unauthorized
    """
    note = db.query(Note).filter(Note.note_id == note_id).first()
    
    if not note:
        return False  # Note does not exist
    
    if user_id and note.created_by != user_id:
        return False  # User is not the owner, deny delete
    
    db.delete(note)   # This will also delete all associated NoteState entries
    db.commit()
    return True

def modify_note(db, note_id, new_content, user_id=None):
    """Modify the content of a note.
    
    Args:
        db: Active database session
        note_id: The ID of the note to update
        new_content: New text content for the note
        user_id: Optional. If provided, only allow modification by the creator.
    
    Returns:
        True if modified, False if not found or unauthorized
    """
    note = db.query(Note).filter(Note.note_id == note_id).first()
    
    if not note:
        return False  # Note not found
    
    if user_id and note.created_by != user_id:
        return False  # User is not the owner, deny edit

    note.content = new_content
    db.commit()
    return True

# When you call filter_notes(), make sure to specify the paramaters
def filter_notes(
    db,
    user_id=None,
    text_contains=None,
    color=None,
    created_after=None,
    created_before=None,
    within_bounds=None  # Tuple: (x_min, x_max, y_min, y_max)
):
    query = db.query(Note)
    
    if user_id:
        query = query.filter(Note.created_by == user_id)
    
    if text_contains:
        query = query.filter(Note.content.ilike(f"%{text_contains}%"))
    
    if color:
        query = query.filter(Note.color == color)
    
    if created_after:
        query = query.filter(Note.created_at >= created_after)
    
    if created_before:
        query = query.filter(Note.created_at <= created_before)

    if within_bounds:
        x_min, x_max, y_min, y_max = within_bounds
        query = query.join(NoteState).filter(
            NoteState.position_x >= x_min,
            NoteState.position_x <= x_max,
            NoteState.position_y >= y_min,
            NoteState.position_y <= y_max
        )

    return query.all()

# Database Testing Functions ##########################################################################################

def show_tables(db, include_yoyo=False, only_app_tables=True):
    """Show tables that exist in the database
    
    Args:
        db: Database session
        include_yoyo: If False, filter out Yoyo migration tables
        only_app_tables: If True, only show application tables (Users, Notes, Note_States)
    
    Returns:
        List of table names
    """
    result = db.execute(text("SHOW TABLES"))
    all_tables = [row[0] for row in result]
    
    # Filter tables based on parameters
    if not include_yoyo:
        # Filter out any table with 'yoyo' in the name
        all_tables = [table for table in all_tables if 'yoyo' not in table.lower()]
    
    if only_app_tables:
        # Only include your application tables
        app_tables = ['users', 'notes', 'note_states'] # Changed to lower-case because it wasn't showing with case-sensitivity
        all_tables = [table for table in all_tables if table in app_tables]
    
    return all_tables

def count_all_notes(db):
    """Return the total number of notes in the database"""
    return db.query(Note).count()

def count_notes_by_state(db):
    """Return a count of notes in each state"""
    results = db.query(NoteState.state, 
                     func.count(NoteState.note_id))\
              .group_by(NoteState.state)\
              .all()
    return dict(results)

def get_recent_notes(db, limit=10):
    """Get recently created notes with their current states"""
    return db.query(Note)\
           .order_by(Note.created_at.desc())\
           .limit(limit)\
           .all()

def get_user_stats(db):
    """Get statistics about users and their notes"""
    # Count users
    user_count = db.query(User).count()
    
    # Count notes per user
    notes_per_user = db.query(
        Note.created_by,
        func.count(Note.note_id)
    ).group_by(Note.created_by).all()
    
    # Calculate average notes per user
    if user_count > 0:
        total_notes = sum(count for _, count in notes_per_user)
        avg_notes = total_notes / user_count
    else:
        avg_notes = 0
    
    return {
        "user_count": user_count,
        "notes_per_user": dict(notes_per_user),
        "average_notes_per_user": avg_notes
    }

def dump_table_data(db, model_class):
    """Return all rows from a table as dictionaries
    Example: dump_table_data(db, User)
    """
    items = db.query(model_class).all()
    
    # Convert SQLAlchemy objects to dictionaries
    result = []
    for item in items:
        item_dict = {}
        for column in model_class.__table__.columns:
            column_name = column.name
            column_value = getattr(item, column_name)
            item_dict[column_name] = column_value
        result.append(item_dict)
    
    return result

def show_table_schema(db, table_name):
    """Display column information for a specific table"""
    result = db.execute(text(f"DESCRIBE `{table_name}`"))
    columns = []
    for row in result:
        columns.append({
            'field': row[0],
            'type': row[1],
            'null': row[2],
            'key': row[3],
            'default': row[4],
            'extra': row[5]
        })
    return columns

def check_foreign_keys(db):
    """Verify foreign key relationships are properly set up"""
    result = db.execute(text("""
        SELECT 
            TABLE_NAME, COLUMN_NAME, 
            REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
        FROM information_schema.KEY_COLUMN_USAGE
        WHERE REFERENCED_TABLE_SCHEMA = DATABASE()
          AND REFERENCED_TABLE_NAME IS NOT NULL
    """))
    
    fk_relationships = []
    for row in result:
        fk_relationships.append({
            'table': row[0],
            'column': row[1],
            'references_table': row[2],
            'references_column': row[3]
        })
    return fk_relationships

def get_db_size(db):
    """Get the total size of the database and individual tables"""
    result = db.execute(text("""
        SELECT 
            table_name,
            ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
        FROM information_schema.TABLES
        WHERE table_schema = DATABASE()
        ORDER BY size_mb DESC
    """))
    
    sizes = {}
    total_size = 0
    for row in result:
        table_size = float(row[1])
        sizes[row[0]] = table_size
        total_size += table_size
    
    return {'total_mb': total_size, 'tables': sizes}
