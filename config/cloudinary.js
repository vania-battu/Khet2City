const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Mock cloudinary
const upload = multer({ dest: 'uploads/' });

module.exports = {
  cloudinary,
  upload
};
