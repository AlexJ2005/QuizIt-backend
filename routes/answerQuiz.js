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
        dbAnswer.answer.replace(/\s/g, "").toLowerCase() ==
        userAnswer.userAnswer.replace(/\s/g, "").toLowerCase()
      ) {
        answerFeedBack.push({
          [dbAnswer.text]: true,
        });
      } else {
        answerFeedBack.push({
          [dbAnswer.text]: false,
        });
      }
    }

    const user = await User.findById(req.body.name);

    if (req.body.name === null || !user) {
      const rightAnswer = getRightAnswers(answerFeedBack);
      const updatedQuiz = quiz.playedBy.push({
        name: "Unknown",
        rightAmount: rightAnswer,
      });
      await quiz.save(updatedQuiz);
      res.send({ name: quiz.name, answerFeedBack });
    } else if (user) {
      await User.findById(req.body.name).then(async (user) => {
        //update user
        const rightAnswers = getRightAnswers(answerFeedBack);
        const addQuiz = { name: quiz.name, rightAmount: rightAnswers };
        const updatedUser = user.playedQuizzes.push(addQuiz);
        user.save(updatedUser);
        //update quiz
        const updatedQuiz = quiz.playedBy.push({
          name: user.name,
          rightAmount: rightAnswers,
        });
        await quiz.save(updatedQuiz);
        res.send({ name: quiz.name, answerFeedBack, rightAnswers });
      });
    }
  });
});

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

module.exports = router;
