const express = require('express');

const Tags = require("../models/Tags");
const fetchuser = require('../middleware/fetchuser');

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const router = express.Router();

router.post("/addtag", async(req, res)=>{
    try{

        let tag = await Tags.create({
            tagname: req.body.tagname,
            desc : req.body.desc
        })

        res.json({ "Success": "Added tags Successfully", "status": true })

    }
    catch(e){
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/gettag", async(req, res)=>{
    try{

        let tags = await Tags.find();

        res.json(tags);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

router.post("/tagdesc/:tagname", async(req, res)=>{
    try{
        let tag = await Tags.findOne({tagname : req.params.tagname});
        res.json(tag);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
})

module.exports = router