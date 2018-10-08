const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('./model/user');
const hbs = require('hbs');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const config = require('./config');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(config.db.url, {useNewUrlParser: true});

app.use(flash());

app.use(require('express-session')({
    secret: 'Java is like JavaScrip though',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('concat', (...args) => args.slice(0, -1).join(''));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));


const indexRouter = require('./routes/index');
const campgroundRouter = require('./routes/campgrounds');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/user');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.flash = {
        success: req.flash('success'),
        error: req.flash('error'),
    };
    return next();
});
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:campgroundId/comments', commentRouter);

app.use(express.json());

app.use('/api/campgrounds', require('./api/campgrounds'));

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

// error handler
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

module.exports = app;
