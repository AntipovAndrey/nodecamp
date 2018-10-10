const express = require('express');
const router = express.Router();

const {requireLoggedIn} = require('../middleware/jwt');
const {validId} = require('../middleware');

const campgroundController = require('../controllers/campground');

router.get('/', async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize;
        const page = req.query.page;
        let all = await campgroundController.getAll({
            pageSize: pageSize,
            page: page
        });
        all.campgrounds = all.campgrounds.map(c => {
            return {
                id: c._id,
                name: c.name,
                image: c.image,
                description: c.description,
                author: {
                    id: c.author.id,
                    username: c.author.username
                },
                created: c.created,
                updated: c.updated,
                comments: c.comments
            };
        });
        return res.status(200)
            .json(all);
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
        const created = await campgroundController.create(campground, {id: req.user.id, username: req.user.username});
        return res.redirect(`${req.baseUrl}/${created._id}`);
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', validId, async (req, res, next) => {
    try {
        const campground = await campgroundController.findById(req.params.id);
        if (!campground) {
            return next();
        }
        const comments = campground.comments.map(c => {
            return {
                author: {
                    id: c.author.id,
                    username: c.author.username
                },
                text: c.text
            }
        });
        res.status(200)
            .json({
                campground: {
                    id: campground._id,
                    name: campground.name,
                    image: campground.image,
                    description: campground.description,
                    author: {
                        id: campground.author.id,
                        username: campground.author.username
                    },
                    comments: comments
                },
            });
    } catch (error) {
        return next(error);
    }
});

/*
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
*/

module.exports = router;
