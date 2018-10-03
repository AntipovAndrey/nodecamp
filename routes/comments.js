const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../model/campground');
const Comment = require('../model/comment');

const ifLoggedIn = require('./user').ifLoggedIn('/login');

router.get('/new', ifLoggedIn, (req, res, next) => {
    if (!Campground.isObjectId(req.params.campgroundId)) {
        return next();
    }
    Campground.findById(req.params.campgroundId)
        .then((campground) => {
            if (!campground) {
                return next();
            }
            res.render('comments/new', {campground: campground})
        })
        .catch(next);
});

router.post('/', ifLoggedIn, async (req, res, next) => {
    if (!Campground.isObjectId(req.params.campgroundId)) {
        return next();
    }
    let campground = Campground.findById(req.params.campgroundId);
    let comment = Comment.create(req.body.comment);
    campground = await campground;
    comment = await comment;
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    console.log(comment);
    comment.save();
    campground.comments.push(comment);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports = router;
