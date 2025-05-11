const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', fileController.listFiles);
router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);

module.exports = router;