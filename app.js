const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const db = require("./utils/dbConnect")
require("dotenv").config();


const indexRouter = require('./routes/index');
const csrfTokenRouter = require('./routes/csrfToken');
const usersRouter = require('./routes/users');
const emailRouter = require('./routes/email');
const refreshTokenRouter = require('./routes/refreshToken');
const detailsRouter = require('./routes/details');

const app = express();

app.use(cors({
            origin: "https://register-and-login-app.netlify.app",
            credentials: true
        }))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/csrf', csrfTokenRouter);
app.use('/users', usersRouter);
app.use('/email', emailRouter);
app.use('/refreshToken', refreshTokenRouter);
app.use('/details', detailsRouter);



db.getConnection(function(err, connection){
    if(err){
        return cb(err);
    }
    connection.changeUser({database : "heroku_8f772d7e14d0609"});
    connection.query("SELECT * from users", function(err, data){
        connection.release();
        cb(err, data);
    });
  });


module.exports = app;
