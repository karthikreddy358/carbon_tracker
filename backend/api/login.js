const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
// ===> API route for register
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // 3. Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Bcrypt error:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            // 4. Insert new user
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Insert error:', err);
                    return res.status(500).json({ message: 'Database error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// ===> Create the POST /api/login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Dummy authentication logic (for now)
  if (email === 'test@example.com' && password === 'password123') {
    res.json({
      message: 'Login successful',
      user: {
        name: 'Test User',
        email: 'test@example.com'
      },
      token: 'fake-jwt-token-123'
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
