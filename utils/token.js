
const jwt = require("jsonwebtoken");
dotenv = require("dotenv");
// Define a secret key (use a strong, random key and store it in environment variables)
const SECRET_KEY = process.env.JWT_SECRET
console.log(process.env.JWT_SECRET);
// Token expiration time (e.g., 1 hour)
const TOKEN_EXPIRATION = "1h";

/**
 * Generates a JWT token for a user.
 * @param {number} userId - The ID of the user.
 * @returns {string} - The generated JWT token.
 */
function generateToken(userId) {
  // Define the payload with user information
  const payload = { id: userId };

  // Generate and return the token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
  return token;
}

module.exports = generateToken;
