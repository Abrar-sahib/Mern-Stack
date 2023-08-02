const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requried: [true, "please add user-name"],
    },
    email: {
      type: String,
      requried: [true, "please add email address"],
      unique: [true, "email already taked"]
    },
    password: {
      type: String,
      requried: [true, "please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
