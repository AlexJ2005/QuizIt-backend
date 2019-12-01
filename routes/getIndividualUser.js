const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/:id", async (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ err: "No user was found" });
    }
    res.send(user);
  });
});

module.exports = router;
