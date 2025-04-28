# export_db.py -- exports the entire database to a .csv

import os
import pandas as pd
from sqlalchemy import create_engine, text
import configparser
from datetime import datetime

# Read database configuration
config = configparser.ConfigParser()
ini_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'yoyo.ini')
config.read(ini_path)
DATABASE_URL = config['DEFAULT']['database']

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

def export_table_to_csv(table_name, output_dir='exports'):
    """Export a single table to CSV"""
    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate a timestamp for the filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{output_dir}/{table_name}_{timestamp}.csv"
    
    # Read table into a pandas DataFrame
    query = f"SELECT * FROM `{table_name}`"
    df = pd.read_sql(query, engine)
    
    # Export the table to CSV
    df.to_csv(filename, index=False)
    print(f"Exported {len(df)} rows from {table_name} to {filename}")
    
    return filename

def export_all_tables():
    """Export all tables to CSV files"""
    # Get all application tables
    with engine.connect() as connection:
        result = connection.execute(text("SHOW TABLES"))
        tables = [row[0] for row in result 
                 if not row[0].startswith('_yoyo') and row[0] != 'yoyo_lock']
    
    # Export each of the tables
    exported_files = {}
    for table in tables:
        exported_files[table] = export_table_to_csv(table)
    
    return exported_files

def export_joined_notes():
    """Export notes with their states joined together"""
    # Create a output directory if it doesn't exist
    output_dir = 'exports'
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate a timestamp for the filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{output_dir}/notes_with_states_{timestamp}.csv"
    
    # Complex query to join notes with their states
    query = """
    SELECT 
        n.note_id, n.content, n.color, n.format, n.created_at, n.expires_at,
        n.type, n.is_prompt, n.prompt_id, n.created_by, n.is_auto_generated,
        ns.state_id, ns.state, ns.user_id, ns.position_x, ns.position_y,
        ns.added_at, ns.weather_level, ns.z_index, ns.rotation
    FROM 
        Notes n
    JOIN 
        Note_States ns ON n.note_id = ns.note_id
    """
    
    # Read joined data into pandas DataFrame
    df = pd.read_sql(query, engine)
    
    # Export to a CSV
    df.to_csv(filename, index=False)
    print(f"Exported {len(df)} rows of joined notes and states to {filename}")
    
    return filename

if __name__ == "__main__":
    print()
    print("Exporting tables to CSV...")
    exported_files = export_all_tables()
    
    print("\nExporting joined notes data...")
    joined_notes_file = export_joined_notes()
    
    print(f"files created: {list(exported_files.values()) + [joined_notes_file]}")
    print("\nAll exports completed successfully.")