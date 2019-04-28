const express = require('express');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const router = express.Router();
// Models
const { Users, Validate } = require('../../models/Users');


router.get('/', (req, res) => {
    res.send('users')
});
// Register
router.post('/register', (req, res) => {
    // Validation
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check Email
    Users.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email is already Registerd.' });
        } else {
            // Avatar
            const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
            // Create
            const newuser = new Users({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password,
            });
            // Salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newuser.password = hash;
                    // save
                    newuser.save().then(user => res.json(user)).catch(err => console.error(err));
                });
            });
        }
    })
});
// Login
router.get('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check Email Exist
    Users.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email is not registred.' });
        }
        // Check Password is Correct
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Generate Payload
                // Generate Token
                res.json({ msg: "Login Success" });
            } else {
                return res.status(400).json({ password: 'Password is incorrect' });
            }
        })
    })
});
module.exports = router;