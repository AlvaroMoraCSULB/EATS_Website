const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the profile pictures directory
const PROFILE_PICS_DIR = path.join(__dirname, '../../client/public/profile_pics/uploaded');

// Ensure directory exists
if (!fs.existsSync(PROFILE_PICS_DIR)) {
  fs.mkdirSync(PROFILE_PICS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PROFILE_PICS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `user_${req.user.id}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});