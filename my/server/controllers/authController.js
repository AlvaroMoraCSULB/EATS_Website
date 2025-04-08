const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/emailService");

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const whitelistedEmails = process.env.OFFICER_WHITELIST?.split(",") || [];
    const isOfficer = whitelistedEmails.includes(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      email, 
      username, 
      password: hashedPassword, 
      is_officer: isOfficer 
    });

    await newUser.save();
    
    // Send welcome email (non-blocking)
    sendEmail(
      email,
      "Welcome to EATS!",
      `Hi ${username},\n\nThank you for joining EATS!`,
      `<h1>Welcome!</h1><p>Hi ${username},</p><p>Thank you for joining EATS!</p>`
    ).catch(console.error);

    res.status(201).json({ 
      message: "User registered successfully!", 
      is_officer: isOfficer 
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Registration failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      is_officer: user.is_officer,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Add this new method
exports.getProfile = async (req, res) => {
  try {
    // User is attached by authMiddleware
    const user = await User.findById(req.user.id)
      .select('-password -__v');
      
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ 
      message: "Failed to fetch profile",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};