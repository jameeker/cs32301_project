# test_db.py -- gives a quick overview of what's in the database without manual SQL queries
import time
from datetime import datetime
from db import (
    get_db,
    count_all_notes,
    count_notes_by_state,
    get_user_stats,
    dump_table_data,
    show_tables,
    show_table_schema,
    check_foreign_keys,
    get_db_size,
    User,
    Note,
    NoteState,
    func
)

def print_section(title, width=60, sep_char="-"):
    """Prints a nicely formatted section header with a consistent length"""
    print()
    prefix = f"--- {title} "
    print(prefix + sep_char * (width - len(prefix)))

def print_sample(name, items, sample_size=2):
    """Prints sample data and total count from a table"""
    total = len(items)
    sample = items[:sample_size] if items else 'None'
    print(f"{name} ({total}): {sample}")

def test_query_performance(db, iterations=3):
    """Test performance of common queries"""
    queries = {
        "Get all public notes": lambda: db.query(Note, NoteState)
            .join(NoteState)
            .filter(NoteState.state == "public")
            .all(),
        "Count notes by state": lambda: db.query(NoteState.state, 
            func.count(NoteState.note_id))
            .group_by(NoteState.state)
            .all()
    }
    
    results = {}
    for name, query_func in queries.items():
        total_time = 0
        for _ in range(iterations):
            start = time.time()
            query_func()
            end = time.time()
            total_time += (end - start)
        
        avg_time = (total_time / iterations) * 1000  # Convert to milliseconds
        results[name] = avg_time
    
    return results

def database_health_check(db):
    """Run a health check on the database"""
    checks = {
        "Required tables exist": True,
        "Foreign keys properly configured": True,
        "Connection successful": True
    }
    
    # Check required tables
    required_tables = ['users', 'notes', 'note_states'] # Changed table names to lower-case to fix case sensitiviy issues
    existing_tables = show_tables(db)
    
    missing_tables = [table for table in required_tables if table not in existing_tables]
    if missing_tables:
        checks["Required tables exist"] = False
        checks["Missing tables"] = missing_tables
    
    # Check foreign keys
    fk_relationships = check_foreign_keys(db)
    if not fk_relationships:
        checks["Foreign keys properly configured"] = False
    
    # Overall status
    overall_status = all(value is True for value in checks.values() 
                        if isinstance(value, bool))
    
    return {
        "status": "PASS" if overall_status else "FAIL",
        "checks": checks
    }

# Then modify your run_tests function to add the new sections:
def run_tests():
    db = get_db()

    now = datetime.now()
    print(f"run: {now.strftime('%Y-%m-%d %H:%M:%S')}") # Timestamp
    print_section("Database Health Check")
    health = database_health_check(db)
    print(f"Overall Status: {health['status']}")
    for check, result in health['checks'].items():
        if isinstance(result, bool):
            print(f"  {check}: {'✓' if result else '✗'}")
        else:
            print(f"  {check}: {result}")
    
    print_section("Database Size")
    db_size = get_db_size(db)
    print(f"Total database size: {db_size['total_mb']:.2f} MB")
    for table, size in db_size['tables'].items():
        if size > 0.01:  # Only show tables with measurable size
            print(f"  {table}: {size:.2f} MB")
    
    print_section("Query Performance")
    query_times = test_query_performance(db)
    for query, time_ms in query_times.items():
        print(f"{query}: {time_ms:.2f} ms")

    print_section("Tables in the MySQL database")
    tables = show_tables(db)
    print(f"{tables}")

    print_section("Database Stats")
    print(f"total notes: {count_all_notes(db)}")
    print(f"notes by state: {count_notes_by_state(db)}")
    print(f"user stats: {get_user_stats(db)}")

    print_section("Sample Data")
    print_sample("users", dump_table_data(db, User))
    print_sample("notes", dump_table_data(db, Note))
    print_sample("note states", dump_table_data(db, NoteState))

if __name__ == "__main__":
    run_tests()