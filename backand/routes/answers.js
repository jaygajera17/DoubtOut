const express = require('express');

const Answer = require("../models/Answer");

const router = express.Router();

router.post('/addanswer/:id', async(req, res)=>{
    try{

        let answer = await Answer.create({
            questionid : req.params.id,
            answer: req.body.answer,
            postedId: req.body.postedId,
            postedBy : req.body.postedBy,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes
        })

        res.json({"Success" : "Added Answer Successfully", "status":true})
    }
    catch(error){
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/fetchanswer/:id", async(req, res)=>{
    try{
        const answers = await Answer.find({questionid : req.params.id});
        res.json(answers);
    }

    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

module.exports = router