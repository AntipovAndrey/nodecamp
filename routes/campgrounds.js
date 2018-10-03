const express = require('express');
const router = express.Router();

const Campground = require('../model/campground');
const {isLoggedIn} = require('./user');

router.get('/', (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render('campgrounds/index', {
            campgrounds: campgrounds
        }))
        .catch(console.log);
});

router.post('/', (req, res) => {
    const campground = new Campground({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    });
    campground.save()
        .then(() => res.redirect(req.baseUrl + '/'))
        .catch(console.log);
});

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', (req, res, next) => {
    if (!Campground.isObjectId(req.params.id)) {
        return next();
    }
    Campground.findById(req.params.id)
        .populate('comments')
        .then(campground => {
            if (!campground) {
                return next();
            }
            console.log(campground.comments);
            res.render('campgrounds/show', {
                campground: campground,
                canComment: res.locals.currentUser !== undefined
            });
        })
        .catch(next);
});


module.exports = router;
