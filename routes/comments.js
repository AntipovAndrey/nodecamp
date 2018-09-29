const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../model/campground');
const Comment = require('../model/comment');

router.get('/new', (req, res, next) => {
    if (!Campground.isObjectId(req.params.campgroundId)) {
        next();
        return;
    }
    Campground.findById(req.params.campgroundId)
        .then((campground) => {
            if (!campground) {
                next();
            } else {
                res.render('comments/new', {campground: campground})
            }
        })
        .catch(next);
});

router.post('/', async (req, res, next) => {
    if (!Campground.isObjectId(req.params.campgroundId)) {
        next();
        return;
    }
    let campground = Campground.findById(req.params.campgroundId);
    const comment = await Comment.create(req.body.comment);
    campground = await campground;
    campground.comments.push(comment);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports = router;
