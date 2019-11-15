const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  name: String,
  questions: [
    {
      text: String,
      answer: String
    }
  ],
  playedBy: [
    {
      name: String
    }
  ]
});

module.exports = mongoose.model("Quiz", QuizSchema);
