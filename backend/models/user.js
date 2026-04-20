const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    unique: true,
    required: true,
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    required: true,
    type: Number,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
