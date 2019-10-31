const express = require('express');
const Quiz = require('../models/Question');
const router = express.Router();
 

router.post('/:id', (req, res) => {
   Quiz.findById(req.params.id, (err, quiz) => {
      if(err || !quiz){
         return res.status(404).json({error: err});
      }
      let answerFeedBack = [];

      const {questions} = quiz;


      for(let key in questions){
         let dbAnswer = questions[key];
         let userAnswer = req.body.allAnswers[key];


         if(dbAnswer.answer.toLowerCase() == userAnswer.userAnswer.toLowerCase()){
            answerFeedBack.push({
               [dbAnswer.text]: true
            })
         } else{
            answerFeedBack.push({
               [dbAnswer.text]: false
            })
         }
      }
      
      
      res.send({name: quiz.name, answerFeedBack})

   
   })
   

})

module.exports = router;