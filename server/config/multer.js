const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
         cb(null, path.join(__dirname, "../profile_pictures"));
      } else {
         cb({ message: "This file is not an image file" }, false);
      }
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const maxSize = 200 * 1024 * 1024;

const upload = multer({
   storage: storage,
});

module.exports = upload;
