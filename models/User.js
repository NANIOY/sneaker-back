const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the User model schema
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
