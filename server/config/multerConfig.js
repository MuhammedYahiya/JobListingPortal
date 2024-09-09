// multerConfig.js
const multer = require('multer');
const path = require('path');

// Define storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
