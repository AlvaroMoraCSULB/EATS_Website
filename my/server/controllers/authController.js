const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/emailService");

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Get the whitelist from the .env file
    const whitelistedEmails = process.env.OFFICER_WHITELIST.split(",");

    // Check if the email is whitelisted
    const isOfficer = whitelistedEmails.includes(email);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, username, password: hashedPassword, is_officer: isOfficer });
    await newUser.save();
	
	 // Send welcome email
    const subject = "Welcome to EATS!";
    const text = `Hi ${username},\n\nThank you for joining EATS!`;
    const html = `<h1>Welcome!</h1><p>Hi ${username},</p><p>Thank you for joining EATS!</p>`;

    await sendEmail(email, subject, text, html);

    res.status(201).json({ message: "User registered successfully!", is_officer: isOfficer });
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, message: "Login successful!", is_officer: user.is_officer });
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again." });
  }
};