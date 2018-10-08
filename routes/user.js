const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
const {requireLoggedIn} = require('../middleware');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res, next) => {
    const newUser = new User({username: req.body.username});
    try {
        await User.register(newUser, req.body.password);
        passport.authenticate('local')(req, res, (err, user) => {
            req.flash('success', `Welcome to YelpCamp ${user.username}!`);
            res.redirect('/campgrounds')
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    if (req.query.redirect) {
        req.session.redirect = req.query.redirect;
    }
    res.render('login');
});

router.post('/login', (req, res, next) => {
    const redirectUrl = req.session.redirect || '/';
    if (req.session.redirect) {
        delete req.session.redirect;
    }
    passport.authenticate('local', {
        successRedirect: redirectUrl,
        failureRedirect: '/login'
    })(req, res, next);
});

router.get('/logout', requireLoggedIn, (req, res) => {
    req.flash('success', `See you soon, ${req.user.username}`);
    req.logout();
    res.redirect('/campgrounds');
});


module.exports = router;
