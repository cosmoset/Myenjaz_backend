const express = require("express");
const router = express.Router();
const {createApplication, getAllApplicants, getApplicant, editApplication} = require("../controllers/application.controller");

const authMiddleware = require("../middlewares/auth_middle_ware");

router.post("/new_application",authMiddleware, createApplication);
router.get("/getallapplicants/", authMiddleware, getAllApplicants)
router.put("/updateapplication/:passportNo", authMiddleware, editApplication)
router.get("/getapplicant/:passportNo", authMiddleware, getApplicant)
module.exports = router;
