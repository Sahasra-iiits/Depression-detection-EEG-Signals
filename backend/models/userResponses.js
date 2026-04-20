const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  Q_id: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  phase: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  responseTime: {
    type: Number,
  },
});

const userResponses = mongoose.model("userResponses", userResponseSchema);
module.exports = userResponses;
