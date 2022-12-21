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
const path = require('path');

// Create Express App
const app = express();

// App Configuration

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


// Start our server
app.listen(process.env.PORT);