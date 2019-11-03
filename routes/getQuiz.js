const Quiz = require('../models/Question');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let {name} = req.query;
    
    
    Quiz.find((err, quiz) => {
        if(err || !quiz){
            return res.status(404).json({error: "No quizes were found"})
        }    
        const searchedQuiz = quiz.filter((quiz) => {return quiz.name.includes(name)})
        if(name == undefined || name==''){
        return res.send(quiz)
        } else if(name){
            res.send(searchedQuiz)
        }
        })
    
})

module.exports = router;