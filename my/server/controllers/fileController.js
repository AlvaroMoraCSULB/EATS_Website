const fs = require('fs');
const path = require('path');

const getUploadsPath = () => path.resolve(__dirname, '../../client/public/uploads');

module.exports = {
  listFiles: (req, res) => {
    fs.readdir(getUploadsPath(), (err, files) => {
      if (err) return res.status(500).json({ error: "Error reading files" });
      //console.log('Found files:', files);
      res.json(files);
    });
  },

  uploadFile: async (req, res) => {
    try {
      if (!req.user.is_officer) return res.status(403).json({ error: "Officer access required" });
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const filePath = path.join(getUploadsPath(), req.file.filename);
      if (!fs.existsSync(filePath)) {
        throw new Error('File was not saved to disk');
      }

      res.json({ success: true, filename: req.file.filename });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: err.message });
    }
  }
};