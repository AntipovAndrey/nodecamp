const express = require('express');
const router = express.Router();

const Campground = require('../model/campground');
const ifLoggedIn = require('../middleware/index').ifLoggedIn('/login');
const {validId, checkCampgroundOwnership} = require('../middleware');

router.get('/', (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render('campgrounds/index', {
            campgrounds: campgrounds,
            canPost: res.locals.currentUser !== undefined
        }))
        .catch(console.log);
});

router.post('/', ifLoggedIn, async (req, res) => {
    const campground = await Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });

    res.redirect(`${req.baseUrl}/${campground._id}`)
});

router.get('/new', ifLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', validId, (req, res, next) => {
    Campground.findById(req.params.id)
        .populate('comments')
        .then(campground => {
            if (!campground) {
                return next();
            }
            res.render('campgrounds/show', {
                campground: campground,
                canComment: res.locals.currentUser !== undefined,
                canEdit: req.user && campground.author.id.equals(req.user._id)
            });
        })
        .catch(next);
});

router.get('/:id/edit', validId, checkCampgroundOwnership, ifLoggedIn, (req, res, next) => {
    Campground.findById(req.params.id)
        .then(campground => {
            if (!campground) {
                return next();
            }
            res.render('campgrounds/edit', {
                campground: campground,
            });
        })
        .catch(next);
});

router.put('/:id', validId, checkCampgroundOwnership, ifLoggedIn, (req, res, next) => {
    const data = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Campground.findByIdAndUpdate(req.params.id, data)
        .then(campground => {
            if (!campground) {
                return next();
            }
            res.redirect(`${req.params.id}`);
        })
        .catch(next);
});

router.delete('/:id', validId, checkCampgroundOwnership, async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    await campground.remove();
    res.redirect('/')
});

module.exports = router;
