const express = require("express");
const Quiz = require("../models/Question");
const User = require("../models/User");
const router = express.Router();
const getRightAnswers = require("../utils/helper");

router.post("/:id", (req, res) => {
  Quiz.findById(req.params.id, (err, quiz) => {
    if (err || !quiz) {
      return res.status(404).json({ error: err });
    }
    let answerFeedBack = [];

    const { questions } = quiz;

    for (let key in questions) {
      let dbAnswer = questions[key];
      let userAnswer = req.body.allAnswers[key];

      if (
        dbAnswer.answer.toLowerCase() == userAnswer.userAnswer.toLowerCase()
      ) {
        answerFeedBack.push({
          [dbAnswer.text]: true
        });
      } else {
        answerFeedBack.push({
          [dbAnswer.text]: false
        });
      }
    }
    if (req.body.name) {
      User.findOne({ name: req.body.name }).then(user => {
        //update user
        const rightAnswers = getRightAnswers(answerFeedBack);
        const addQuiz = { name: quiz.name, rightAmount: rightAnswers };
        const updatedUser = user.playedQuizzes.push(addQuiz);
        user.save(updatedUser);
        //update quiz
        const updatedQuiz = quiz.playedBy.push({ name: user.name });
        quiz.save(updatedQuiz);
        res.send({ name: quiz.name, answerFeedBack });
      });
    }
  });
});

module.exports = router;
