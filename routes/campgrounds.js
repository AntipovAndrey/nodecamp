const express = require('express');
const router = express.Router();

const {validId, checkCampgroundOwnership, requireLoggedIn} = require('../middleware');

const campgroundController = require('../controllers/campground');

router.get('/', async (req, res, next) => {
    console.log(res.locals);
    try {
        const campgrounds = await campgroundController.getAll();
        return res.render('campgrounds/index', {
            campgrounds: campgrounds,
            canPost: res.locals.currentUser !== undefined
        });
    } catch (error) {
        return next(error);
    }
});

router.post('/', requireLoggedIn, async (req, res, next) => {
    try {
        const campground = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
        };
        const created = await campgroundController.create(campground, {id: req.user._id, username: req.user.username});
        return res.redirect(`${req.baseUrl}/${created._id}`);
    } catch (error) {
        return next(error);
    }
});

router.get('/new', requireLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', validId, async (req, res, next) => {
    try {
        const campground = await campgroundController.findById(req.params.id);
        if (!campground) {
            return next();
        }
        res.render('campgrounds/show', {
            campground: campground,
            canComment: res.locals.currentUser !== undefined,
            canEdit: req.user && campground.author.id.equals(req.user._id)
        });
    } catch (error) {
        return next(error);
    }
});

router.get('/:id/edit', validId, checkCampgroundOwnership, async (req, res, next) => {
    try {
        const campground = await campgroundController.findById(req.params.id);
        if (!campground) {
            return next();
        }
        res.render('campgrounds/edit', {
            campground: campground
        });
    } catch (error) {
        return next(error);
    }
});

router.put('/:id', validId, checkCampgroundOwnership, async (req, res, next) => {
    try {
        const campground = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
        };

        const updated = await campgroundController.edit(req.params.id, campground, {
            id: req.user._id,
            username: req.user.username
        });

        if (!updated) {
            return next();
        }
        return res.redirect(`${req.params.id}`);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', validId, checkCampgroundOwnership, async (req, res, next) => {
    try {
        const deleted = await campgroundController.remove(req.params.id, {
            id: req.user._id,
            username: req.user.username
        });

        if (!deleted) {
            return next();
        }
        res.redirect('/')
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
