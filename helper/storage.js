const multer = require("multer");
const log = require("./logger");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    fs.mkdir("${__dirname}/uploads", function (err) {
      if (err) {
        log(err);
        throw err;
      } else {
        callback(null, "./uploads");
      }
    });
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

module.exports = storage;
