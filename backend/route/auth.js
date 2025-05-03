const express = require('express');
const router = express.Router();
const db = require('../db');

// Example: GET all users
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// Example: POST create a user
router.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Database insert error' });
    } else {
      res.status(201).json({ message: 'User created!', userId: result.insertId });
    }
  });
});

module.exports = router;
