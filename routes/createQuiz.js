const express = require('express');
const router = express.Router();
const Quiz = require('../models/Question')


router.post('/', (req, res) => {

    const newQuiz = new Quiz({
        name: req.body.name,
        questions: req.body.questions
    })

    newQuiz.save().then((quiz) => res.json(quiz));
})

module.exports = router;