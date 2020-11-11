const multer = require("multer");

module.exports.uploadImage = (type) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../../images/${type}s`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var upload = multer({ storage: storage });
  return upload.single(type);
};
