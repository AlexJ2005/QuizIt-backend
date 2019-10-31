const Quiz = require('../models/Question');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Quiz.find((err, quiz) => {
        if(err || !quiz){
            return res.status(404).json({error: "No quizes were found"})
        }    
        
        return res.send(quiz)
    })
})

module.exports = router;