const mongoose = require('mongoose');
// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
        type: String
    },
    date: {
        type: Date, default: Date.now
    }
});
// Model
const Users = new mongoose.model('users', userSchema);

exports.Users = Users;