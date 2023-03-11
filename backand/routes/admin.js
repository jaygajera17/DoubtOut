const express = require('express');
const Admin = require("../models/Admin");
const User = require("../models/User");
const router = express.Router();
const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

router.post('/createuser', [
    body('username', 'Name Must have atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    // If there are errors return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0]['msg'] });
    }

    try {
        // check whether the user with this email already exist

        // if (req.body.password != req.body.confirm_password) {
        //     return res.status(400).json({ error: "Both Password Must be same" });
        // }

        let user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await Admin.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,

        })

        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }

        console.log(data);
        const authtaken = jwt.sign(data, JWT_SECRET);

        localStorage.setItem('token', authtaken);
        localStorage.setItem('username', req.body.username);
        res.json({ 'success': authtaken, 'username': req.body.username });
        // res.json({autotaken});
    }
    catch (err) {
        console.error(err.message);
        // res.status(500).send("Some error occured");
        res.status(400).json({ error: "Internal server error" });
    }


})

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
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;