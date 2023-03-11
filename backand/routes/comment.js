const express = require('express');

const fetchuser = require('../middleware/fetchuser');
const Comment = require("../models/Comment");
const { route } = require('./questions');

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const router = express.Router();

// To add a new Comment of a perticular answer of a question.
router.post('/addcomment/:id',fetchuser, async (req, res) => {
    try {

        let comment = await Comment.create({
            questionid: req.body.qid,
            answerid: req.params.id,
            postedId: req.user.id,
            postedBy: req.user.username,
            comment: req.body.comment
        })

        res.json({ "Success": "Added Commnet Successfully", "status": true })
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

// To fetch all comments related to perticular answer of any question

router.post("/fetchComments", async(req, res)=>{
    try{

        let comments = await Comment.find({questionid : req.body.qid, answerid:req.body.ansid});

        res.json(comments);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal server error");
    }
})

module.exports = router