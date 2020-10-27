if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const indexRoute = require('./routes/index')
const flash = require('connect-flash')
const session = require('express-session')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}).
    then(()=> console.log("Connected to Databse")). 
    catch((err)=> console.log("Connection to database failed. Error: "+err));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view-engine', 'ejs');

//Doing the session part
app.use(session({
    cookie: {
        httpOnly: true, //This says that the cookie is not accessible by the scripts on the client side. Protection against XSS
        secure: false, //Make this true in production mode to only send cookie through https secure connection
        maxAge: process.env.COOKIE_EXP//This is the max age till which the cookie would be valid.
    }
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(process.env.PORT || 80);