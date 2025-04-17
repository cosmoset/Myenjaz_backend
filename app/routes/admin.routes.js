const express = require("express");
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  check, 
  deleteAdmin,
  getAllAdmins,
  changePassword 
} = require('../controllers/admin.controller');

const { authMiddleware , isAdmin} = require('../middlewares/authMiddleware');

// router.post("/register",authMiddleware, register);
router.post("/register", register);

router.post("/login", login);
router.get("/check",authMiddleware, check);
router.post("/logout", logout);
router.get('/admins', authMiddleware, getAllAdmins);
router.delete("/delete/:id",authMiddleware,isAdmin, deleteAdmin); // Route to delete user by ID
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
