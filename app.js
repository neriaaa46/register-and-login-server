const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const {handleDisconnect} = require("./utils/dbConnect")
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

handleDisconnect()

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


module.exports = app;
