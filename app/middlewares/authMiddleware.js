const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Authentication token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
    }
}


const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };
