const express = require('express');
const answer = require('../models/Answer');

const Answer = require("../models/Answer");
const { route } = require('./questions');

const router = express.Router();

router.post('/addanswer/:id', async (req, res) => {
    try {

        let answer = await Answer.create({
            questionid: req.params.id,
            answer: req.body.answer,
            postedId: req.body.postedId,
            postedBy: req.body.postedBy,
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
module.exports = router