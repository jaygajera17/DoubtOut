const express = require('express');
const User = require("../models/User");
const router = express.Router();
const Question = require("../models/Question")


router.post('/users',async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deleteUser/:id',async (req,res) => {
    try{
         User.findByIdAndRemove(req.params.id,(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("deleted");
                }
         });
         console.log(req.params.id);
        res.json({"status": "deleted"});
    }
    catch (e) {
       // console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})


router.delete('/deletequestion/:id',async (req,res) => {
    try{
            Question.findByIdAndRemove(req.params.id,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("deleted");
                    }
            });
           // console.log(req.params.id);
            res.json({"status": "deleted"});
        }
        catch (e) {
            // console.log(e.message);
            res.status(500).send("Internal Server Error");
        }
    })

        

        


module.exports = router;