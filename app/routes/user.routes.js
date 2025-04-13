const express = require("express");
const router = express.Router();
const {  register, login, logout, check, deleteAdmin } = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth_middle_ware");

// router.post("/register",authMiddleware, register);
router.post("/register", register);

router.post("/login", login);
router.get("/check",authMiddleware, check);
router.post("/logout", logout);
router.delete("/delete/:id",authMiddleware, deleteAdmin); // Route to delete user by ID

module.exports = router;
