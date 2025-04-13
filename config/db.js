// db.js (or wherever your DB configuration is)
const mysql2 = require("mysql2");
require("dotenv").config();

const dbConnection = mysql2.createPool({
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: Number(process.env.CONNECTION_LIMIT),
});


module.exports = dbConnection.promise();
