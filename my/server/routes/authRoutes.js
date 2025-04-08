const express = require("express");
const { 
  register, 
  login,
  getProfile 
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const officerMiddleware = require("../middleware/officerMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getProfile); // Updated to use controller

router.get("/officer-only", 
  authMiddleware, 
  officerMiddleware, 
  (req, res) => {
    res.json({ 
      message: "Officer route accessed",
      user: req.user 
    });
  }
);

module.exports = router;