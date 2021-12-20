const send = require("@polka/send-type");

exports.json = function (res, data, code = 200) {
  send(res, code, data);
};

exports.error = function (res, err) {
  let error = {
    code: err.code || err.status || 500,
    message: err.message || err.trace || "Not defined",
  };
  send(res, error.code, { error: error });
};
