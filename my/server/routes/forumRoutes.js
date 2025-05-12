const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", forumController.getThreads);

// Protected routes
router.post("/", authMiddleware, forumController.createThread);
router.post("/:id/comments", authMiddleware, forumController.addComment);

module.exports = router;