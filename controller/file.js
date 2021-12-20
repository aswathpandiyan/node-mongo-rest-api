const storage = require("../helper/storage");
const send = require("../helper/response");
const createError = require("http-errors");

exports.uploadOne = async (req, res, next) => {
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      // var ext = path.extname(file.originalname);
      // if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      //   return callback(new createError("Only images are allowed"));
      // }
      if (file.mimetype != "image/jpeg" || file.mimetype != "image/png") {
        return callback(new createError("Only images are allowed"));
      }
      callback(null, true);
    },
  }).single("userFile");
  upload(req, res, function (err) {
    if (err) {
      return send.error(res, err);
    }
    res.end("File is uploaded");
    send.json(res, { message: "File uploaded" }, 201);
  });
};
