const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const mongoose = require('mongoose');
mongoose.plugin(function (schema) {
    schema.statics.isObjectId = function (id) {
        if (id) {
            return /^[0-9a-fA-F]{24}$/.test(id);
        }
        return false;
    };
});

const indexRouter = require('./routes/index');
const campgroundRouter = require('./routes/campgrounds');
const commentRouter = require('./routes/comments');

require('./seeds')();
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:campgroundId/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    const status = !err.status ? 500 : err.status;
    res.status(status)
        .render('error', {
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {},
            status: status
        });
});

module.exports = app;
