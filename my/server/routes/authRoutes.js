const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const officerMiddleware = require("../middleware/officerMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (requires authentication)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile accessed!", user: req.user });
});

// Officer-only route (requires authentication and officer privileges)
router.get("/officer-only", authMiddleware, officerMiddleware, (req, res) => {
  res.json({ message: "This route is accessible only to officers.", user: req.user });
});

module.exports = router;