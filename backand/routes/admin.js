const express = require('express');
const User = require("../models/User");
const router = express.Router();
const Question = require("../models/Question")
const Answer = require("../models/Answer")


router.post('/users',async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/questions',async(req,res)=>{
    try {
        const questions = await Question.find();
        res.json(questions);
    }
    catch(e){
         console.log(e.message);
         res.status(500).send("internel server error");
    }
})

router.post('/noOfUsers',async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users.length);
    }
    catch(e){
         console.log(e.message);
         res.status(500).send("internel server error");
    }
})

router.post('/noOfQuestions',async(req,res)=>{
    try {
        const questions = await Question.find();
        res.json(questions.length);
    }
    catch(e){
         console.log(e.message);
         res.status(500).send("internel server error");
    }
}
)

router.post('/noOfAnswers',async(req,res)=>{
    try{
        const answer = await Answer.find();
        res.json(answer.length);

    }
    catch(e){
        console.log(e.message);
        res.status(500).send("internel server error");
    }
})
 
router.post('/noOfAccept',async(req,res)=>{
    try{
        const answer = await Answer.find({status:"Accepted"});
        res.json(answer.length);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("internel server error");
    }
})

router.delete('/deleteUser/:id',async (req,res) => {
    try{
         User.findByIdAndRemove(req.params.id,(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("deleted");
                }
         });
         console.log(req.params.id);
        res.json({"status": "deleted"});
    }
    catch (e) {
       // console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})


router.delete('/deletequestion/:id',async (req,res) => {
    try{
            Question.findByIdAndRemove(req.params.id,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("deleted");
                    }
            });
           // console.log(req.params.id);
            res.json({"status": "deleted"});
        }
        catch (e) {
            // console.log(e.message);
            res.status(500).send("Internal Server Error");
        }
    })

   router.get('/question-by-month',async(req,res)=>{
       
           const questions = await Question.aggregate([
                {
                    $group: {
                        _id: { $month: "$date" },
                        count: { $sum: 1 }
                    }
                }
           ]);
          
              res.json(questions);
       
   })   


router.get('/chart',async(req,res)=>{
    try{
        const questions = await Question.aggregate([
            {
                $match: { date: { $exists: true } }
              },
            {
                
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 }
                }
            }
       ]);
       res.json(questions);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("internel server error");
    }
})  



module.exports = router;