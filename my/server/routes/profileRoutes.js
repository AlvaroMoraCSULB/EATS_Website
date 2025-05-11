const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const fileUpload = require('../middleware/fileUpload');

router.patch(
  '/picture',
  authMiddleware,
  fileUpload,
  profileController.uploadProfilePic
);

module.exports = router;