# database.py - Python file with all the SQLAlchemy connection and tables (called 'models') to interact with our database
import configparser
from datetime import datetime, timedelta

# SQLAlchemy imports - these are the core SQLAlchemy components we need
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, scoped_session

# Read database configuration from ini file
config = configparser.ConfigParser()
config.read('yoyo.ini')
DATABASE_URL = config['DEFAULT']['database']

# Create a SQLAlchemy engine which connects to the hic_project MySQL database
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
    prompt_id         = Column(Integer, ForeignKey("notes.note_id", ondelete="SET NULL"))
    created_by        = Column(String(255), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
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
    note_id       = Column(Integer, ForeignKey("notes.note_id", ondelete="CASCADE"), nullable=False)
    state         = Column(Enum("public", "personal", "trash", "archived", name="state_type"), nullable=False)
    user_id       = Column(String(255), ForeignKey("users.user_id", ondelete="CASCADE"))
    position_x    = Column(Float, default=0.5)
    position_y    = Column(Float, default=0.5)
    added_at      = Column(DateTime, default=datetime.utcnow, nullable=False)
    weather_level = Column(Integer, default=0, nullable=False)
    z_index       = Column(Integer, default=0)
    rotation      = Column(Float, default=0)
    
    # Define relationship to access user
    user = relationship("User", backref="note_states")

# Helper functions to make database operations easier
def get_db():
    """Get a database session"""
    db = Session()
    try:
        return db
    finally:
        # Make sure to close when done - this will be called when your Flask app tears down
        db.close()

# Database operations - Simple functions for common tasks
def create_new_note(db, content, user_id, color="yellow", is_prompt=False, prompt_id=None):
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
        state="public"
    )
    db.add(public_state)
    
    # Update user's last active timestamp
    user = db.query(User).filter(User.user_id == user_id).first()
    user.last_active = datetime.utcnow()
    
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