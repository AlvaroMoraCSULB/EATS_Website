require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Thread schema
const threadSchema = new mongoose.Schema({
  author: String,
  content: String,
  comments: [{ author: String, content: String }],
});

const Thread = mongoose.model("Thread", threadSchema);

// Authentication middleware
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

// Register endpoint
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

// Login endpoint
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

// Get profile endpoint
app.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ email: user.email });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload file endpoint (only for authorized email)
app.post("/upload", authenticate, upload.single("file"), async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.email !== "eatsrules123@gmail.com") {
      return res.status(403).json({ message: "Forbidden: Only authorized officer can upload" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file received by server" });
    }

    console.log("Upload successful:", req.file.filename);
    res.status(200).json({ message: "File uploaded successfully", file: req.file.filename });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload error", error: err.message });
  }
});


// Fetch list of uploaded files
app.get("/files", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Unable to list files" });
    res.json(files);
  });
});

// Create thread
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

// Fetch threads
app.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch {
    res.status(500).json({ message: "Error fetching threads" });
  }
});

// Add comment
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
