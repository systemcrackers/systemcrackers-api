const multer = require('multer');

// Setting storage path
const storage = multer.memoryStorage();

// Setting allowed filetypes
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'sound/mp3') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Setting multer configs
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;