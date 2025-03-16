require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Define Thread Schema
const threadSchema = new mongoose.Schema({
  author: String,
  content: String,
  comments: [{ author: String, content: String }],
});

const Thread = mongoose.model("Thread", threadSchema);

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Register User
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch {
    res.status(500).json({ message: "Server error. Try again." });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "Login successful!" });
  } catch {
    res.status(500).json({ message: "Server error. Try again." });
  }
});

// Create Thread
app.post("/threads", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const newThread = new Thread({ author: user.username, content: req.body.content, comments: [] });
    await newThread.save();
    res.status(201).json({ message: "Thread created successfully!" });
  } catch {
    res.status(500).json({ message: "Error creating thread" });
  }
});

// Fetch Threads
app.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch {
    res.status(500).json({ message: "Error fetching threads" });
  }
});

// Add Comment
app.post("/threads/:id/comments", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const thread = await Thread.findById(req.params.id);
    thread.comments.push({ author: user.username, content: req.body.content });
    await thread.save();
    res.status(201).json({ message: "Comment added!" });
  } catch {
    res.status(500).json({ message: "Error adding comment" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
