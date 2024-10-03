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

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profilePicture') {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed for profile picture'), false);
      return;
    }
  } else if (file.fieldname === 'resume') {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Only PDF and Word documents are allowed for resume'), false);
      return;
    }
  }
  cb(null, true);
};


// Create multer instance with storage configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

module.exports = upload;
