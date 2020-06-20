const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User with that email does not exist");
  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password)
    return res
      .status(400)
      .send("Your password did not match with the given email");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);

  res.header("auth-token", token).send(token);
});

module.exports = router;
