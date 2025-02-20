// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express"); // Express framework for building the server
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const jwt = require("jsonwebtoken");
const app = express(); // Initialize the Express application

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS (allows frontend to communicate with backend)
app.use(cors());
// Connect to MongoDB
/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err)); */
mongoose.connect(process.env.MONGO_URI);


// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create newuser instance 
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save(); // save it
    // send success response
    res.status(201).json({ message: "User registered successfully!" }); 
  } catch (error) { 
    // error
    res.status(500).json({ message: "Server error. Try again." });
  }
});
// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
// start listening in on server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
