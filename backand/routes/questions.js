const express = require('express');
// const LocalStorage = require('node-localStorage').LocalStorage;
// var localStorage = new LocalStorage('./scratch');
const Question = require("../models/Question");
const User = require("../models/User");
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
        res.json(questions);
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

    res.json(question.votes);
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
            if(tag.toLowerCase() === req.params.name)
            {
                questionsPertag.push(que);
            }
        })
    })
    res.json(questionsPertag);
})

module.exports = router