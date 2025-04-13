const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../../config/db");
const { genSalt, hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Register an Admin
async function register(req, res) {
    const { username, email, password, full_name, phone_no, role } = req.body;

    if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username, email, and password are required" });
    }

    try {
        // Check if admin already exists
        const [existingAdmin] = await dbConnection.query(
            "SELECT id FROM admin WHERE username = ? OR email = ?",
            [username, email]
        );

        if (existingAdmin.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Insert into the database
        await dbConnection.query(
            "INSERT INTO admin (username, email, password_hash, full_name, phone_no, role) VALUES (?, ?, ?, ?, ?, ?)",
            [username, email, hashedPassword, full_name, phone_no, role || 'admin']  // Default role 'admin' if not provided
        );

        return res.status(StatusCodes.CREATED).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
}

// ✅ Login Admin
async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "username and password are required" });
    }

    try {
        // Check if the admin exists
        const [admin] = await dbConnection.query(
            "SELECT id, username, password_hash, role FROM admin WHERE username = ?",
            [username]
        );

        if (admin.length === 0) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid username or password" });
        }

        const adminData = admin[0];

        // Compare passwords
        const validPassword = await compare(password, adminData.password_hash);
        if (!validPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid username or password" });
        }

        // Generate a token with role information
        const token = jwt.sign(
            { id: adminData.id, username: adminData.username, role: adminData.role },  // Include role in token
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(StatusCodes.OK).json({ message: "Login successful", token, username: adminData.username });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
}

// ✅ Delete Admin
async function deleteAdmin(req, res) {

    const adminIdToDelete = parseInt(req.params.id);  // Admin to delete, passed in URL param
    const loggedInAdminId = parseInt(req.user.id);  // Admin's ID (from auth middleware)
    const loggedInAdminRole = req.user.role;  // Admin's role (from auth middleware)

    try {
        // Check if the admin exists (to prevent deleting a non-existent admin)
        const [admin] = await dbConnection.query(
            "SELECT id FROM admin WHERE id = ?",  // Querying the admin table
            [adminIdToDelete]
        );


        if (admin.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Admin not found" });
        }

        // Admins cannot delete their own account
        if (loggedInAdminId === adminIdToDelete) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "Admins cannot delete their own account" });
        }

        // Check if logged-in admin has sufficient privileges (e.g., only 'superadmin' or 'admin' can delete)
        if (loggedInAdminRole !== 'admin') {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "Insufficient permissions to delete admin" });
        }

        // Admin can delete another admin account
        await dbConnection.query("DELETE FROM admin WHERE id = ?", [adminIdToDelete]);
        return res
            .status(StatusCodes.OK)
            .json({ message: "Admin account deleted successfully" });

    } catch (error) {
        console.error("Error deleting admin:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again later" });
    }
}

// ✅ Logout Admin (Frontend handles token removal)
async function logout(req, res) {
    try {
        return res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
}

// ✅ Check Admin Authentication


const check = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });
  };
  



module.exports = { register, login, logout, check, deleteAdmin };
