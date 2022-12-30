const express = require('express');
const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const User = require("../models/User");

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

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

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,

        })

        const data = {
            user: {
                id: user.id,
            }
        }

        console.log(data);
        const authtaken = jwt.sign(data, JWT_SECRET);
       
        localStorage.setItem('token', authtaken);
        localStorage.setItem('userType', req.body.type);
        res.json({ 'success': authtaken, 'userType': req.body.type, 'email': req.body.email });
        // res.json({autotaken});
    }
    catch (err) {
        console.error(err.message);
        // res.status(500).send("Some error occured");
        res.status(400).json({ error: "Internal server error" });
    }


})

module.exports = router