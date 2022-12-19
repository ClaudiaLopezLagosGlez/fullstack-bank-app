// Import dependencies
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    balance: Number
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;