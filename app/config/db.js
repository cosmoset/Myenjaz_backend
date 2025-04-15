const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || 'myenjaz',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'mydatabase',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database with pg Pool:', err.stack);
    return;
  }
  console.log('Successfully connected to database with pg Pool');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};