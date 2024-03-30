const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original file name for storing
    }
});

// Create Multer instance
const upload = multer({ storage: storage });

module.exports = upload;
