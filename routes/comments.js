const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../model/campground');
const Comment = require('../model/comment');

router.get('/new', (req, res) => {
    Campground.findById(req.params.campgroundId)
        .then((campground, err) => {
            if (err) {
                throw err;
            }
            res.render('comments/new', {campground: campground})
        })
        .catch(console.log);
});

router.post('/', async (req, res) => {
    let campground = Campground.findById(req.params.campgroundId);
    const comment = await Comment.create(req.body.comment);
    campground = await campground;
    campground.comments.push(comment);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports = router;
