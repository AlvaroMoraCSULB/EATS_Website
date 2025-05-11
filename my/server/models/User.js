const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  is_officer: { 
    type: Boolean, 
    default: false 
  },
  profilePic: { 
    type: String,  // Stores filename only (e.g. "user_12345.jpg")
    default: null
  },
  bio: {
    type: String,
    maxlength: 200,
    default: ""
  },
  skills: [{
    type: String
  }],
  last_active: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model("User", userSchema);