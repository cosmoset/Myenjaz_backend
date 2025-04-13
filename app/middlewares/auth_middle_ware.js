const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {  
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { username, id, role } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = { username, id, role };

        // If you want to restrict this middleware to **only admin users**, add this check:
        if (role !== "admin") {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: "Access denied: Admins only" });
        }

        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;
