const Quiz = require('../models/Question');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    Quiz.findById(req.params.id, (err, quiz) => {
        if(err || !quiz){
            return res.json({error: 'Quiz was not found'})
        }

        res.json(quiz)
    })
    
  
  
})

module.exports = router;