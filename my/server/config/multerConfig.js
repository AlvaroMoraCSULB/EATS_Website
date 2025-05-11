const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_PATH = path.resolve(__dirname, '../../client/public/uploads');
//console.log('Upload destination:', UPLOADS_PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(UPLOADS_PATH, { recursive: true });
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    //console.log('Saving file as:', uniqueName);
    cb(null, uniqueName);
  }
});

module.exports = multer({ storage });