const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { config, engine } = require('express-edge');
const passport = require('./app/config/passport');
const swagger = require('./app/config/swagger');
require('dotenv').config();

const webRouter = require('./routes/web/web');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');


const app = express();

// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine',  'ejs');
app.use(engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/', webRouter);
app.use('/api', apiRouter);
app.use('/api-docs',swagger.serve,swagger.setup);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('page/error/index');
});



module.exports = app;