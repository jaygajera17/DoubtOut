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
        })

        res.json({"Success" : "Added Query Successfully", "status":true})
    }
    catch(error){
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})
module.exports = router