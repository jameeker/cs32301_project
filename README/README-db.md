## Dependencies ======================================================================================================

- This project uses [yoyo](https://pypi.org/project/yoyo-migrations/) to manage database migrations
`pip install yoyo-migrations`

- Once in the `.venv` Python virtual environment, install all requirements by running:
```python
pip install -r requirements.txt
```

## Database Setup ====================================================================================================

In order to set up database schema, run the following commands in MySQL:

1. Login to MySQL
```sql
mysql -u USERNAME -p -- use your personal username. It will ask you for your password after you enter.
```

2. Once in MySQL, create the hic_project
```sql
CREATE DATABASE hic_project;
```

### Database Export
- The database (with all of the test data) has been exported using the `mysqldump` command
- It is under `/database export/hic_project_dump.sql`
- Note that we can achieve the same thing using simply by applying the migrations (see below)

## Creating Migrations (adding things to the database) ===============================================================

To make changes to the database and add items, create a new `00-migration-file.sql` SQL file in src/migrations.
*Note: the file name must be sequential (so that yoyo knows the order of execution)*

1. At the project root (`cs32301_project/`), run `yoyo apply` to apply the migrations 
```python
# Switch out your personal username and password if needed. ex: mysql://USERNAME:PASSWORD@localhost/hic_project
python -m yoyo apply --database mysql://root:password@localhost/hic_project backend/database/database-migrations

```
**Note: this will ask you to create a <yoyo.ini> config file that stores your database credentials in plain text (already in `gitignore`)**

## Logging into Existing Database ====================================================================================

If your database is already set up and you just need to connect to it, follow these steps:

1. Login to MySQL
```sql
mysql -u USERNAME -p -- Use your personal username. It will ask you for your password after you enter.
```

2. Display available databases
```sql
SHOW DATABASES; -- Shows you what databases you have in MySQL
```
You should see something like this:
+--------------------+
| Database           |
+--------------------+
| hic_project        |
+--------------------+

3. Select the correct database to work with
```sql
USE hic_project;
SELECT DATABASE(); -- Optional: helpful check to see what database you're currently in
```

4. Verify connection 
```sql
SHOW TABLES; -- Checks existing tables:
```

## Running Backend Flask app =========================================================================================

1. Once inside `/cs33007_databases_project`, execute the following command to run the application: 
*Note:* Don't forget to run it from the `/src` directory with `src/main.py`
Tip: add the `--debug` flag to run the flask app in debug mode, making it easier to see errors and new changes in real-time without having to rebuild the app each time.

```zsh
python -m flask --app src/main.py --debug run  
```