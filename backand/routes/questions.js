const express = require('express');
// const LocalStorage = require('node-localStorage').LocalStorage;
// var localStorage = new LocalStorage('./scratch');
const Question = require("../models/Question");

// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// // const fetchuser = require('../middleware/fetchuser');
// var jwt = require('jsonwebtoken');

// const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

router.post('/addquestion', async(req, res)=>{
    try{

        let question = await Question.create({
            user : "63ae7ece9d17649ec3278fb8",
            title: req.body.title,
            question: req.body.question,
            tags : req.body.tags,
            postedBy: 'darshit',
        })

        res.json({"Success" : "Added Query Successfully", "status":true})
    }
    catch(error){
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post('/fetchquestions', async(req, res)=>{
    try{
        const questions = await Question.find({user : "63ae7ece9d17649ec3278fb8"});
        res.json(questions);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})
router.post('/fetchQueById/:id', async(req, res)=>{

    try{
        const question = await Question.findById(req.params.id);

        if(!question)
        {
            return res.status(404).send("Question not Found");

        }

        res.json(question);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router