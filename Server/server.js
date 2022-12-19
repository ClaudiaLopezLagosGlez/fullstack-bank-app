// Load environment variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/connectToDb');
const accountsController = require('./controllers/accountsController');
const requireAuth = require('./middleware/requireAuth');

// Create Express App
const app = express();

// App Configuration
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true
    }));
app.use(express.urlencoded({extended: false}));


// Connect to DB
connectToDb();

// Routes Definitions

// Create Account Route
app.post('/account/create', accountsController.createAccount);

// Create Login Route
app.post('/account/login', accountsController.login);

// Create Logout Route
app.get('/account/logout', accountsController.logout);

// Deposit Route with authorization
app.put('/account/deposit', requireAuth, accountsController.makeDeposit);

// Withdraw Route with authorization
app.put('/account/withdraw', requireAuth, accountsController.makeWithdraw);

// Show All Data Route
app.get('/account/all', accountsController.showAll);


// Start our server
app.listen(process.env.PORT);