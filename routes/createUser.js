const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", (req, res) => {
  const name = req.body.name;
  const userExists = User.findOne({ name: name });
  if (userExists) {
    return res
      .status(403)
      .json({ error: "User with that name already exists" });
  }
  const newUser = new User({ name: name, playedQuizzes: [] });

  newUser.save().then(user => res.send(user));
});

module.exports = router;
