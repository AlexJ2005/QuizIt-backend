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
      createdBy: user.name
    });

    newQuiz
      .save()
      .then(() => res.send({ quiz: newQuiz }))
      .catch(err => res.send(err));
  });
});

module.exports = router;
