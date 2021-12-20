const send = require("../helper/response");
const createError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const log = require("../helper/logger");
const token = require("../helper/token");

const User = require("../model/users");

exports.create = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw createError.BadRequest(`username or password is missing`);

    const doesExist = await User.findOne({ username: username });
    if (doesExist)
      throw createError.Conflict(`${username} already been registered`);
    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    const user = new User({ username: username, password: hashedPassword });
    const result = await user.save();

    send.json(res, result);
  } catch (err) {
    log.error(err.message);
    if (err.name === "ValidationError") {
      next(createError(422, err.message));
      return;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne(req.body, { __v: 0, password: 0 });
    if (!user) {
      throw createError(404, "User does not exist");
    }
    const accessToken = await token.generateAccessToken(user._id);
    const refreshToken = await Producttoken.generateRefreshToken(user._id);
    send.json(res, { accessToken, refreshToken });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid username or password"));
      return;
    }
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) throw createError.BadRequest(`refresh token is missing`);
    const user = await token.verifyRefreshToken(refreshToken);

    const naccessToken = await token.generateAccessToken(user.aud);
    const nrefreshToken = await token.generateRefreshToken(user.aud);
    send.json(res, { accessToken: naccessToken, refreshToken: nrefreshToken });
  } catch (err) {
    next(err);
  }
};
