const express = require('express');
const router = express.Router({mergeParams: true});

const validId = require('../middleware').validId('campgroundId');
const {requireLoggedIn} = require('../middleware');

const commentController = require('../controllers/comment');
const campgroundController = require('../controllers/campground');

router.use(validId);

router.get('/new', requireLoggedIn, async (req, res, next) => {
    try {
        const campground = await campgroundController.findById(req.params.campgroundId);
        if (!campground) {
            return next();
        }
        return res.render('comments/new', {campground: campground});
    } catch (error) {
        return next(error);
    }
});

router.post('/', requireLoggedIn, async (req, res, next) => {
    try {
        const comment = {text: req.body.text};
        const created = await commentController.create(req.params.campgroundId, comment, {
            id: req.user._id,
            username: req.user.username
        });
        console.log(created);
        if (!created) {
            return next();
        }
        return res.redirect(`/campgrounds/${req.params.campgroundId}`);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
