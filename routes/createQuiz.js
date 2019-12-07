const express = require("express");
const router = express.Router();
const Quiz = require("../models/Question");
const User = require("../models/User");

router.post("/", async (req, res) => {
  await User.findById(req.body.id, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: err });
    }

    const newQuiz = new Quiz({
      name: req.body.name,
      questions: req.body.questions,
      alternatives: req.body.alternatives,
      createdBy: user.name
    });

    newQuiz
      .save()
      .then(() => res.send({ response: "Quiz succesfully created" }))
      .catch(err => res.send(err));
  });
});

module.exports = router;
