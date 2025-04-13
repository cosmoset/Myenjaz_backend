// this is for testing the apps logs
const { StatusCodes } = require("http-status-codes");
const { query } = require("../config/db");


async function register(req, res) {
 

 
  try {
    // Check if the user already exists
    const [existingUser] = await query(
      "SELECT username, email FROM Account WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length) {
      console.log("User already exists");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or username already registered" });
    }

    // Check password length
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Encrypt the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Insert new user into the database
    await query(
      "INSERT INTO Account (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await query(
      "SELECT id, username, password FROM Account WHERE email = ?",
      [email]
    );

    if (!user || user.length === 0) {
      console.log("Invalid email or password - no user found");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const userData = user[0]; // Safely access the first result

    // Compare the password
    const validPassword = await compare(password, userData.password);

    if (!validPassword) {
      // Fixed condition here
      console.log("Invalid email or password - password mismatch");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = generateToken(userData.id);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

module.exports = { register, login };
