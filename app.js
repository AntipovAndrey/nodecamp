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

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});

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
