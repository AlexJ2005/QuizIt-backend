const express = require("express");
const Quiz = require("../models/Question");
const User = require("../models/User");
const router = express.Router();
const getRightAnswers = require("../utils/helper");

router.post("/:id", async (req, res) => {
  await Quiz.findById(req.params.id, async (err, quiz) => {
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

    if (req.body.name == null) {
      console.log("This was called");
      const rightAnswers = getRightAnswers(answerFeedBack);
      const updatedQuiz = quiz.playedBy.push({
        name: "Unknown",
        rightAmount: rightAnswers,
        date: Date.now()
      });
      await quiz.save(updatedQuiz);
      res.send({ name: quiz.name, answerFeedBack });
    } else if (req.body.name) {
      await User.findById(req.body.name).then(async user => {
        //update user
        const rightAnswers = getRightAnswers(answerFeedBack);
        const addQuiz = { name: quiz.name, rightAmount: rightAnswers };
        const updatedUser = user.playedQuizzes.push(addQuiz);
        user.save(updatedUser);
        //update quiz
        const updatedQuiz = quiz.playedBy.push({
          name: user.name,
          rightAmount: rightAnswersm,
          date: Date.now()
        });
        await quiz.save(updatedQuiz);
        res.send({ name: quiz.name, answerFeedBack, rightAnswers });
      });
    }
  });
});

module.exports = router;
