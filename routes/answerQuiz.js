const express = require("express");
const Quiz = require("../models/Question");
const User = require("../models/User");
const router = express.Router();
const checkUser = require("../middleware");

router.post("/:id/question", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).select("questions");

  const question = quiz.questions.id(req.body._id);

  const answer = req.body.answer;
  if (
    answer.replace(/\s/g, "").toLowerCase() ===
    question.answer.replace(/\s/g, "").toLowerCase()
  ) {
    res.send({ [question.text]: true });
  } else if (
    answer.replace(/\s/g, "").toLowerCase() !==
    question.answer.replace(/\s/g, "").toLowerCase()
  ) {
    res.send({ [question.text]: false });
  }
});


router.post('/saveResult/guest', async (req, res) => {
  const quiz = await Quiz.findById(req.body._id)
  const playedBy = {
    name: "Unknown",
    rightAmount: req.body.rightAmount,
  }
  await quiz.updateOne({$push: {playedBy }})
})

router.post('/saveResult', checkUser, async (req, res) => {
  const user = await User.findById(req.user._id)
  const quiz = await Quiz.findById(req.body._id);

  const playedBy = {
    name: user.name,
    rightAmount: req.body.rightAmount
  }
  await quiz.updateOne({$push: {playedBy}})
})


module.exports = router;
