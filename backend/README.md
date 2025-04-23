## Dependencies ======================================================================================================

- This project uses [yoyo](https://pypi.org/project/yoyo-migrations/) to manage database migrations
`pip install yoyo-migrations`

- Install requirements by running:
```python
pip install -r requirements.txt
```

## Database Setup ====================================================================================================

In order to set up database schema, run the following commands in MySQL:

1. Login to MySQL
```sql
mysql -u USERNAME -p
```

2. Once in MySQL, create the Juice Xpress database
```sql
CREATE DATABASE cs32301project;
```

### Database Export
- The database (with all of the test data) has been exported using the `mysqldump` command
- It is under `/database export/cs32301projectdump.sql`
- Note that we can achieve the same thing using simply by applying the migrations (see below)

### Creating Migrations (adding things to the database) ==============================================================

To make changes to the database and add items, create a new `000-migration-file.sql` SQL file in src/migrations.
*Note: the file name must be sequential (so that yoyo knows the order of execution)*

1. Run yoyo to apply the migrations 
```python
python -m yoyo apply --database mysql://USERNAME:PASSWORD@localhost/juiceexpress src/migrations
```

Example: `python -m yoyo apply --database mysql://root:@localhost/hic_project backend/database/database-migrations`
**Note: this will ask you to create a <yoyo.ini> config file that stores your database credentials in plain text (already in `gitignore`)**

## Running ===========================================================================================================

1. Create <config.py> under `src/config/` and add the following constants:
```python
MYSQL_HOST = 'localhost'
MYSQL_USER = 'USERNAME' # 'root'
MYSQL_PASSWORD = 'PASSWORD' # ''
MYSQL_DB = 'DB_NAME' # 'juicexpress'
FLASK_SECRET= 'your_secret_string' # used by flask to sign and verify data, prevent tampering
```

<!-- 2. Navigate to `/cs33007_databases_project` directory
```zsh
cd /Your/path/to/cs33007_databases_project
```

3. Once inside `/cs33007_databases_project`, execute the following command to run the application: 
*Note:* Don't forget to run it from the `/src` directory with `src/main.py`
```zsh
python -m flask --app src/main.py run
```

Tip: add the `--debug` flag to run the flask app in debug mode, making it easier to see errors and new changes in real-time without having to rebuild the app each time. See below:
```zsh
python -m flask --app src/main.py --debug run   
``` -->