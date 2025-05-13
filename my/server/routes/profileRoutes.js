const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
//const fileUpload = require('../middleware/fileUpload');
const profileUpload = require('../config/profilePicUpload');

router.patch(
  '/picture',
  authMiddleware,
  profileUpload.single('profilePic'), // Use the dedicated profile upload middleware
  profileController.uploadProfilePic
);

module.exports = router;