const jwt = require('jsonwebtoken');
const Account = require('../models/account');

async function requireAuth (req, res, next) {
    try{
        // Read token off cookies
        const token = req.cookies.Authorization;

        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Check the token expiration
        if(Date.now() > decoded.exp) return res.sendStatus(401);
        
        // Find user using decoded sub
        const account = await Account.findById(decoded.sub);
        if (!account) return res.sendStatus(401);
        
        // attach user to req
        console.log(account);
        req.account = account;
        console.log(req.body)

        // continue on
        next();
    } catch(err) {
        return res.sendStatus(401);
    }    
}

module.exports = requireAuth;