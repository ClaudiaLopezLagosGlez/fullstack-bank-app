// Import dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');

// Functions definitions
const createAccount = async (req, res) => {

    try {
        // Get the data received from request body
        const {name, email, password} = req.body;
        const balance = 0;

        // Hash password
        const hashedPassword = bcrypt.hashSync(password,8);

        // Create a new account
        const account = await Account.create({
            name,
            email,
            password: hashedPassword,
            balance
        })
        // Respond with the new account
        res.json({account});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
};

const login = async (req, res) => {

    try {
        // Get the data from the request body
        const{email, password} = req.body;

        // Find the account with requested email
        const account = await Account.findOne({email});

        // If user does not exists return
        if (!account) return res.sendStatus(401);

        // Compare sent in password with found user password hash
        const passwordMatch = bcrypt.compareSync(password, account.password);

        // If password does not match, send Unauthorized status
        if (!passwordMatch) return res.sendStatus(401);

        // Create a JWT Token
        const exp = Date.now() + 1000 * 60 * 5;
        const token = jwt.sign({ sub: account._id, exp}, process.env.SECRET);

        // Set the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production"
        });

        // Send Token
        //res.sendStatus(200);
        res.send({account});

    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
};

function logout(req, res) {
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200);

    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
};

function checkAuth(req, res) {
    console.log(req.account);
    res.sendStatus(200);
};

const makeDeposit = async (req, res) => {

    // Get the parameters from the req
    const accountEmail = req.account.email;
    const newBalance = Number(req.account.balance) + Number(req.body.amount);

    // Find and update the record
    const account = await Account.findOneAndUpdate({ email: accountEmail} , { balance: newBalance }, { new: true });

    // Respond with updated balance
    res.json({account});
};

const makeWithdraw = async (req, res) => {

    // Get the parameters from the req
    const accountEmail = req.account.email;
    const newBalance = req.body.currentBalance - req.body.withdrawAmount;

    // Find and update the record
    const account = await Account.findOneAndUpdate({ email: accountEmail} , { balance: newBalance }, { new: true });

    // Respond with updated balance
    res.json({account});
};

const showAll = async(req, res) => {
    // Find the accounts
    const accounts = await Account.find();

    // Respond with the accounts
    res.json({accounts});
};   

module.exports = {createAccount, login, logout, checkAuth, makeDeposit, makeWithdraw, showAll};