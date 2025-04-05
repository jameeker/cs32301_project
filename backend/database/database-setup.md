# MySQL Database Step-by-Step Setup

## (1) - Setup MySQL
### 1.1 Install MySQL
*Inside Terminal*

Ubuntu/Debian: `sudo apt update`
               `sudo apt install mysql-server`

macOS:         `brew update` 
               `brew install mysql`

### 1.2 Start MySQL

Ubuntu/Debian: `sudo systemctl start mysql`

macOS:         `brew services start mysql`

### 1.3 Configure a root user
*Inside Terminal*

macOS/Linux: `sudo mysql_secure_installation`

On Windows:
1. download: https://dev.mysql.com/downloads/installer/
2. Launch installer
3. Choose "Developer Default" or "Server only" installation type
4. Set a root password (write down/record it to not forget)
5. Verify successful installation with `mysql --version`

## (2) - Create the Database
### 2.1 Login to MySQL

macOS/Linux: `mysql -u root -p` (enter the root password you set in step 1.3)

Windows: `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p`

### 2.2 Create the empty database

```sql
CREATE DATABASE hic_project; -- Run this to create an empty database
-- The database is named hic_project
```

### 2.3 Create a dedicated user

```sql
CREATE USER 'user'@'localhost' IDENTIFIED BY 'your_secure_password'; -- (!) Replace 'your_secure_password' with a strong password
GRANT ALL PRIVILEGES ON hic_project.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
-- This creates a dedicated user with access only to the bulletin board database
-- NOTE: it'll execute as 3 separate queries
```

### 2.4 Exit MySQL

```sql
EXIT;
```

## (3) - Setup Yoyo Migrations
### 3.1 Install yoyo-migrations

Inside the project root, `/your/path/to/the/repo/cs32301_project`
and inside the `.venv` virtual environment,
run `pip install yoyo-migrations`.

### 3.2 Create migration files as you go inside the database-migrations/ subdirectory

Inside `database-migrations/` located at the `backend/database/database-migrations` file path,
create `.py` Python scripts for each change/update being made to the MySQL database

### 3.3 Create a database configuration file

In the project root `/your/path/to/the/repo/cs32301_project`,
create a `yoyo.ini` file.

```ini
[DEFAULT]
database = mysql://user:your_secure_password@localhost/hic_project
; your_secure_password: replace with the password you created earlier
; user: replace with your username if you set one. or try 'root'
```

### 3.4 Apply and verify successful migrations

While being inside your `(.venv)` in the same terminal:

Apply the migrations by running: `yoyo apply --database mysql://user:your_secure_password@localhost/hic_project ./database-migrations`

Verify migrations by running: `yoyo list --database mysql://user:your_secure_password@localhost/hic_project ./database-migrations`
(should see your newly applied migration show up here)


## Troubleshooting

### Rollback a Yoyo migration
To revert to the most recently applied migration, run: 
`yoyo rollback --database mysql://user:your_secure_password@localhost/hic_project ./database-migrations`