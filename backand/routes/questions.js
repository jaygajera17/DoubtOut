const express = require('express');
// const LocalStorage = require('node-localStorage').LocalStorage;
// var localStorage = new LocalStorage('./scratch');
const Question = require("../models/Question");
const User = require("../models/User");
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
// var jwt = require('jsonwebtoken');

// const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

router.post('/addquestion', fetchuser, async(req, res)=>{
    try{


        let question = await Question.create({
            user : req.user.id,
            title: req.body.title,
            question: req.body.question,
            tags : req.body.tags,
            postedBy: req.user.username,
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
        const questions = await Question.find();
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

router.post('/fetchUserQuestions/:username', async(req, res)=>{
    try{
        let user = await User.findOne({username : req.params.username});

        const questions = await Question.find({user : user._id});

        if(!questions)
        {
            return res.status(404).send("Question not Found");

        }

        res.json(questions);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router