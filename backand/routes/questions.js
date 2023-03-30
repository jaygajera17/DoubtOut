const express = require('express');
// const LocalStorage = require('node-localStorage').LocalStorage;
// var localStorage = new LocalStorage('./scratch');
const Question = require("../models/Question");
const User = require("../models/User");
const Answer = require("../models/Answer");

const ApiFeatures = require("../utils/apifeatures");
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const mongoose = require('mongoose')

// var jwt = require('jsonwebtoken');

// const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

router.post('/addquestion', fetchuser, async (req, res) => {
    try {

        let question = await Question.create({
            user: req.user.id,
            title: req.body.title,
            question: req.body.question,
            tags: req.body.tags,
            postedBy: req.user.username,
            votes: 0
        })

        res.json({ "Success": "Added Query Successfully", "status": true })
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post('/fetchquestions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions.reverse());
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})

router.post('/fetchQueByHigherVotes', async (req, res) => {
    try {
        const questions = await Question.find({}).sort({ votes: -1 });
        res.json(questions);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})
router.post('/fetchQueById/:id', async (req, res) => {

    try {

        let question = await Question.findOne({ _id: req.params.id });
        
        // question=question[0]

        if (!question) {
            return res.status(404).send("Question not Found");
        }
        // console.log()
        res.json(question);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/updateque/:id', async(req, res)=>{
    try{

        const {title, question, tags} = req.body;
        // console.log(req.body);
        const newquestion = {};

        newquestion.title = title;
        newquestion.question = question;
        newquestion.tags = tags;
        let fetchquestion = await Question.findByIdAndUpdate(req.params.id, {$set : newquestion}, {new : true});

        res.json({status:"updated"});
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/deleteque/:id', async(req, res)=>{
    try{

        let deletequestion = await Question.findByIdAndDelete(req.params.id);
        await Answer.deleteMany({questionid : req.params.id});
        res.json({status:"deleted"});
        
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

//finding questions of uses.
router.post('/fetchUserQuestions/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username });

        const questions = await Question.find({ user: user._id });

        if (!questions) {
            return res.status(404).send("Question not Found");

        }

        res.json(questions);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})


//for finding filtered questions of specific user
router.post('/fetchUserFilteredQuestions/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username });

        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const tags = req.body.tags;

        const questions = await Question.find({
            user: user._id
        });

        if (!questions) {
            return res.status(404).send("Question not Found");
        }

        const afterDateapplied = [];
        questions.map(que => {
            const year = que.date.getUTCFullYear();
            var month = que.date.getUTCMonth()+1;
            var day  = que.date.getUTCDate();
            
            if(month>='0' && month<='9') month = "0"+month;
            if(day>='0' && day<='9') day = "0"+day;
            
            const date = year+"-"+month+"-"+day;

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(que);
            }
        })

        const afterTagsapplied = [];
        if(tags){
        afterDateapplied.map(que => {
             if(que.tags.split(" ").includes(tags)){
                 afterTagsapplied.push(que);
             }
        })
        res.json(afterTagsapplied);
    }
    else {

        res.json(afterDateapplied);}
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

//for finding filtered questions
router.post('/fetchUserFilteredQuestions', async (req, res) => {
    try {
        let user = await User.find();

        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const tags = req.body.tags;

        const questions = await Question.find();

        if (!questions) {
            return res.status(404).send("Question not Found");
        }

        const afterDateapplied = [];
        questions.map(que => {
            const year = que.date.getUTCFullYear();
            var month = que.date.getUTCMonth()+1;
            var day  = que.date.getUTCDate();
            
            if(month>='0' && month<='9') month = "0"+month;
            if(day>='0' && day<='9') day = "0"+day;
            
            const date = year+"-"+month+"-"+day;

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(que);
            }
        })

        const afterTagsapplied = [];
        if(tags){
        afterDateapplied.map(que => {
             if(que.tags.split(" ").includes(tags)){
                 afterTagsapplied.push(que);
             }
        })
        res.json(afterTagsapplied);
    }
    else {

        res.json(afterDateapplied);}
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})



//for getting all tags used by all.

router.post("/usedtags", async(req, res)=>{
    try{
        
        let user = await User.find();
        const questions = await Question.find();

        const tags = [];

        questions.map(que => {
            que.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
            })
        })

        res.json(tags);
    }
    catch(e)
    {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

//for getting all tags used by user.

router.post("/usedtags/:username", async(req, res)=>{
    try{
        
        let user = await User.findOne({ username: req.params.username });
        const questions = await Question.find({
            user: user._id
        });

        const tags = [];

        questions.map(que => {
            que.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
            })
        })

        res.json(tags);
    }
    catch(e)
    {
        res.status(400).send("Internal Server Error");
    }
})

router.post("/upvote/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        const vote = question["votes"] + 1;

        const updatedAnswer = await Question.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.json({ "status": "upvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/downvote/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        const vote = question["votes"] - 1;

        const updatedAnswer = await Question.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.json({ "status": "downvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/fetchVotes/:id", async (req, res) => {
    const question = await Question.findById(req.params.id);

    if(question)
    {
        res.json(question.votes);
    }
    
})

router.post("/fetchallVotes", async (req, res) => {
    const allQuestion = await Question.find();
    const obj = {};

    allQuestion.map(que => {
        obj[que._id] = que.votes;
    })
    res.json(obj);
})

// fetch all the questions on a perticulat tag
router.post("/fetchQuePertag/:name", async (req, res) => {
    // const questions = await Question.find({"tags" : {$regex : req.params.name, $options: 'i^" "$" "'}})

    const questions = await Question.find();
    const questionsPertag = [];

    questions.map(que => {
        que.tags.split(" ").map(tag => {
            if (tag.toLowerCase() === req.params.name) {
                questionsPertag.push(que);
            }
        })
    })
    res.json(questionsPertag);
})


router.post("/answeredQue", async (req, res) => {

    const answers = await Answer.find();
    const questions = await Question.find();

    let ansobj = {};


    answers.map(ans => {
        if (ansobj[ans.questionid] == null) {
            ansobj[ans.questionid] = 1;
        }
    })
    const answeredQuestion = [];

    questions.map(que => {
        if (ansobj[que._id] === 1) {
            answeredQuestion.push(que);
        }
    })

    res.json(answeredQuestion);
})

router.post("/unansweredQue", async (req, res) => {
    const answers = await Answer.find();
    const questions = await Question.find();

    let ansobj = {};


    answers.map(ans => {
        if (ansobj[ans.questionid] == null) {
            ansobj[ans.questionid] = 1;
        }
    })
    const unansweredQuestion = [];

    questions.map(que => {
        if (ansobj[que._id] == null) {
            unansweredQuestion.push(que);
        }
    })

    res.json(unansweredQuestion);
})

// search questions
router.post("/search", async (req, res) => {
    // const apifeature = new ApiFeatures(Question.find(), req.query).search().filter();

    try {
        //const jobs = await Job.find();
        // console.log(req.query.keyword);
        let questions = await Question.find({"title": {$regex : req.query.keyword, $options: "i"}});

        if(questions.length === 0)
        {
            questions = await Question.find({"tags": {$regex : req.query.keyword, $options: "i"}});
        }
        res.json(questions);

    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router