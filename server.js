// Include required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Add this line to import cors

// Create an Express application
const app = express();
const port = 3000;

app.use(cors()); // Add this line to enable CORS for all routes
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  user: 'root',
  password: 'sai123',
  database: 'calculator_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Handle login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace 'users' with your actual table name
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error executing login query:', err);
      res.json({ message: 'Login failed. Please try again.' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.json({ message: 'Invalid username or password' });
    }
  });
});

// Handle signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Replace 'users' with your actual table name
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
    if (err) {
      console.error('Error executing signup query:', err);
      res.json({ message: 'Signup failed. Please try again.' });
      return;
    }

    res.json({ message: 'Signup successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
