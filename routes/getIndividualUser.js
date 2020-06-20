const express = require("express");
const User = require("../models/User");
const router = express.Router();
const checkUser = require("../middleware");

router.get("/", checkUser, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.populate("createdQuizzes", (err, user) => {
    user.password = undefined;
    res.send(user);
  });
});

module.exports = router;
