const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res, next) => {
    const newUser = new User({username: req.body.username});
    try {
        await User.register(newUser, req.body.password);
        passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'));
    } catch (e) {
        return next(e);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res, next) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

const isLoggedIn = (req) => req.isAuthenticated();

const ifLoggedIn = url => (req, res, next) => {
    if (isLoggedIn(req)) {
        return next();
    }
    res.redirect(url);
};

module.exports = {
    router,
    isLoggedIn,
    ifLoggedIn
};
