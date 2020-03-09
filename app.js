const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const AuthMiddleWare = require('./middleware/AuthMiddleware');

const app = express();
require('dotenv').config();
require('./bin/db');
require('./helpers/passport.helper');

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(AuthMiddleWare.isAuth);

module.exports = app;
