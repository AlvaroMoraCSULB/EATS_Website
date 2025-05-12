const fs = require('fs');
const path = require('path');
const User = require('../models/User');

exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    const oldFilename = user.profilePic;

    // Delete old file if exists
    if (oldFilename) {
      const oldPath = path.join(__dirname, '../../client/public/profile_pics/uploaded', oldFilename);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update user with new filename
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: req.file.filename },
      { new: true }
    ).select('-password');

    res.json({
      message: "Profile picture updated successfully",
      user: updatedUser,
      profilePicUrl: `/profile_pics/uploaded/${req.file.filename}`
    });

  } catch (error) {
    console.error('Profile picture update error:', error);
    
    // Clean up if error occurred
    if (req.file) {
      const filePath = path.join(__dirname, '../../client/public/profile_pics/uploaded', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.status(500).json({ 
      message: "Failed to update profile picture",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};