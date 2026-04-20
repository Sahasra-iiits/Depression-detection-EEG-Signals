const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  Q_id: {
    required: true,
    unique: true,
    type: Number,
  },
  question: {
    unique: true,
    required: true,
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
  },
  timer: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("questions", questionSchema);
module.exports = Question;
