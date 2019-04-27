const express = require('express');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const router = express.Router();
// Models
const { Users } = require('../../models/Users');

router.get('/', (req, res) => {
    res.send('users')
});

router.post('/register', (req, res) => {
    // Check Email
    Users.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email is already Registerd.' });
        } else {
            // Avatart
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
                })
            });
        }
    })
});
module.exports = router;