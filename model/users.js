const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

// userSchema.pre("save", async (next) => {
//   try {
//     var user = this;
//     console.log("user", user);
//     const salt = await bcrypt.genSalt(10);
//     console.log("salt: ", salt);
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model("user", userSchema);
