const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  playedQuizzes: [
    {
      name: String,
      rightAmount: Number
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
