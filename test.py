from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # Set this if your MySQL has a password
app.config['MYSQL_DB'] = 'hic project'   # Ensure this database exists


mysql = MySQL(app)

# Route to display the form
@app.route('/form')
def form():
    return render_template('form.html')

# Route to handle form submission
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        return "Login via the login form."

    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']

        try:
            cursor = mysql.connection.cursor()
            cursor.execute("INSERT INTO info_table (name, age) VALUES (%s, %s)", (name, age))
            mysql.connection.commit()
            cursor.close()
            return "Done!!"
        except Exception as e:
            return f"Error: {str(e)}"

# Run the app
if __name__ == '__main__':
    app.run(host='localhost', port=5501, debug=True)
