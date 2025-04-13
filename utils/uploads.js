const multer = require("multer");
const path = require("path");



const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase());
      if (isValid) cb(null, true);
      else cb(new Error('Only image files are allowed!'));
    },
  });
  

module.exports = upload;
