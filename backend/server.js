const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // ✅ Correct port for MySQL
});

// Connect to DB
connection.connect((err) => {
  if (err) {
    console.log('DB Connection Error:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// API to register user (not needed for this case)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already registered' });
        }
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error });
  }
});

// API to login user (not needed for this case)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful!' });
  });
});

// API to track emissions and save them with email
app.post('/api/track', (req, res) => {
  const { email, travel, electricity, food, shopping, total } = req.body;

  if (!email || travel == null || electricity == null || !food || shopping == null || total == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Insert into DB with email
  const sql = 'INSERT INTO emissions (email, travel, electricity, food, shopping, total) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [email, travel, electricity, food, shopping, total], (err, result) => {
    if (err) {
      console.error('Error inserting into DB:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Data stored successfully' });
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
