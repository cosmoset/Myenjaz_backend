const express = require("express");
const router = express.Router();
const { generateCertificateHandler } = require("../controllers/generatepdf.controller");
const authMiddleware = require("../middlewares/auth_middle_ware");

// Route to generate the PDF certificate
router.get("/generate-report/:id",authMiddleware, generateCertificateHandler);
module.exports = router;
