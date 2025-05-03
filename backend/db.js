const mysql = require('mysql2');
require('dotenv').config();  // <-- load .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,   // fallback if missing
});

connection.connect((err) => {
  if (err) {
    console.error('❌ DB Connection Failed:', err);
  } else {
    console.log('✅ DB Connected Successfully!');
  }
});

module.exports = connection;
