const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// ✅ Profile
router.get("/profile", verifyToken, authController.getProfile);
router.put("/profile", verifyToken, authController.updateProfile);

module.exports = router;
