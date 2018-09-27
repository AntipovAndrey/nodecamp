const express = require('express');
const router = express.Router();

const Campground = require('../model/campground');

/* GET campgrounds listing. */
router.get("/", (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render("index", {
            campgrounds: campgrounds
        }));
});

router.post("/", (req, res) => {
    const campground = new Campground({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    });
    campground.save()
        .then(() => res.redirect(req.baseUrl + "/"));
});

router.get("/new", (req, res) => {
    res.render("new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: found
            });
        }
    });
});


module.exports = router;
