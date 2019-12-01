const Quiz = require("../models/Question");
const express = require("express");
const router = express.Router();

router.delete("/:id", (req, res) => {
  Quiz.findById({ name: req.params.id })
    .then(quiz => quiz.remove())
    .then(() => res.json({ message: "Quiz successfully removed" }))
    .catch(err => res.send({ message: "Quiz was not found" }));
});

module.exports = router;
