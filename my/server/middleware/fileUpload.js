const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (!req.files || !req.files.profilePic) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uploadDir = path.join(__dirname, '../../client/public/profile_pics/uploaded');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const file = req.files.profilePic;
  const filename = `user_${req.user.id}_${Date.now()}${path.extname(file.name)}`;
  const filepath = path.join(uploadDir, filename);

  file.mv(filepath, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).json({ message: "File upload failed" });
    }
    
    // Attach file info to request for controller
    req.file = {
      filename: filename,
      path: filepath
    };
    next();
  });
};