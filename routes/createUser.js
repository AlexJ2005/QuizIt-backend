const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(403)
      .json({ error: "User with that name already exists" });
  }
  const newUser = new User({
    name,
    email,
    password,
    playedQuizzes: [],
    createdQuizzes: [],
  });

  newUser.password = await bcrypt.hash(newUser.password, 10);

  await newUser.save();

  const token = newUser.generateAuthToken();

  res.json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token,
  });
});

module.exports = router;
