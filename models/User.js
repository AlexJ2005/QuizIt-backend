const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  playedQuizzes: [
    {
      name: String,
      rightAmount: Number,
    },
  ],
  createdQuizzes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Quiz",
    },
  ],
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN);

  return token;
};

module.exports = mongoose.model("User", UserSchema);
