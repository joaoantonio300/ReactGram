const multer = require("multer");
const path = require("path");

// to search more about multerf

// Destination to store image
// what is the funciontion about diskstorage
const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    cb(null, `uploads/${folder}/`);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg formats
      return cb(new Error("Por favor, envie apneas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
