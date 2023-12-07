const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8000;

// Database connection details
const db_config = {
  user: 'todouser',
  password: 'Passw0rd',
  host: 'localhost',
  database: 'todo_app',
  auth_plugin: 'mysql_native_password',
};

// Establish a connection
const conn = mysql.createConnection(db_config);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('static'));

// Set up templates
app.set('views', 'src/templates');
app.set('view engine', 'ejs');

// Route to handle GET requests
app.get('/', (req, res) => {
  // Fetch data from the database
  const query = 'SELECT * FROM todos;';
  conn.query(query, (err, result) => {
    if (err) throw err;

    // Combine column names and rows into a list of objects
    const data = result.map((row) => {
      return {
        No: row.No,
        'Todo item': row['Todo item'],
        Status: row.Status,
        Priority: row.Priority,
      };
    });

    // Render the template with data
    res.render('index', { data });
  });
});

// Route to handle POST requests for saving a task
app.post('/save-task', (req, res) => {
  const task = req.body.task;
  const priority = req.body.priority || 'low';

  // Update the query to include the priority level
  const query = 'INSERT INTO todos (`Todo item`, `Status`, `Priority`) VALUES (?, "in process", ?);';

  // Execute the query with the task and priority parameters
  conn.query(query, [task, priority], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route to handle POST requests for deleting a task
app.post('/delete', (req, res) => {
  const No = req.body.No;

  // Update the query to delete the task by No
  const query = 'DELETE FROM todos WHERE No = ?;';

  // Execute the query with the No parameter
  conn.query(query, [No], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Route to handle POST requests for updating task status
app.post('/update', (req, res) => {
  const No = req.body.No;

  // Update the query to update the task status by No
  const query = 'UPDATE todos SET Status = "Task Finished" WHERE No = ?;';

  // Execute the query with the No parameter
  conn.query(query, [No], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
