const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../model/campground');
const Comment = require('../model/comment');

const ifLoggedIn = require('../middleware').ifLoggedIn('/login');
const validId = require('../middleware').validId('campgroundId');

router.use(validId);

router.get('/new', ifLoggedIn, (req, res, next) => {
    Campground.findById(req.params.campgroundId)
        .then((campground) => {
            if (!campground) {
                return next();
            }
            res.render('comments/new', {campground: campground})
        })
        .catch(next);
});

router.post('/', ifLoggedIn, async (req, res) => {
    let campground = Campground.findById(req.params.campgroundId).exec();
    let comment = Comment.create({
        text: req.body.text,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });
    campground = await campground;
    comment = await comment;
    campground.comments.push(comment);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports = router;
