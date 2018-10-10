const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const config = require('../config');

function setupApplication(app) {
    app.use(flash());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(require('express-session')({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(methodOverride('_method'));
}

function setupErrorHandler(app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        if (req.url.startsWith('/api')) {
            res.status(404)
                .send({
                    error: "Not found"
                });
        } else {
            next(createError(404));
        }
    });

    // global error handler
    app.use(function (err, req, res, next) {
        const status = !err.status ? 500 : err.status;
        const body = {
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {},
            status: status
        };
        if (req.url.startsWith('/api')) {
            res.status(status)
                .send(body);
        } else {
            res.status(status)
                .render('error', body);
        }
    });
}

module.exports = {setupApplication, setupErrorHandler};
