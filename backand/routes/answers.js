const express = require('express');
const answer = require('../models/Answer');

const fetchuser = require('../middleware/fetchuser');
const Answer = require("../models/Answer");
const { route } = require('./questions');

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const router = express.Router();

router.post('/addanswer/:id',fetchuser, async (req, res) => {
    try {

        let answer = await Answer.create({
            questionid: req.params.id,
            answer: req.body.answer,
            postedId: req.user.id,
            postedBy: req.user.username,
            votes: req.body.votes
        })

        res.json({ "Success": "Added Answer Successfully", "status": true })
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/fetchanswer/:id", async (req, res) => {
    try {
        const answers = await Answer.find({ questionid: req.params.id });
        res.json(answers);
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/findNumberOfAns", async (req, res) => {
    try {
        const answers = await Answer.find();

        let obj = {};

        answers.map(answer => {

            if (obj[answer.questionid] == null) {
                obj[answer.questionid] = 1;
            }
            else {
                obj[answer.questionid] += 1;
            }

        })

        res.json(obj);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/upvote/:id", async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        const vote = answer["votes"] + 1;

        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.json({"status": "upvoted"});
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/fetchVotes", async (req, res) => {
    const allAnswers = await Answer.find();
    const obj = {};

    allAnswers.map(ans => {
        obj[ans._id] = ans.votes;
    })
    res.json(obj);
})

router.post("/downvote/:id", async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        const vote = answer["votes"] - 1;

        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.json({"status": "downvoted"});
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/acceptanswer/:id", async(req, res)=>{
    try{
        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, {$set : {"status": "Accepted"}});
        res.json({"status": "Accepted"});
    }

    catch(e){
        console.log(e.message);
        res.status(400).send("Internal Server error");
    }
})

router.post("/points", async(req, res)=>{
    try{
        let username = localStorage.getItem("username");

        let answers = await Answer.find({"postedBy" : username});

        let count = 0;

        answers.map(answer => {
            if(answer.status === "Accepted")
            {
                count += 1;
            }
        })

        count = count * 5;
        res.json({"points" : count});
    }
    catch(e){
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

module.exports = router