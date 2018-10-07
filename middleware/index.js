const Campground = require('../model/campground');
const createError = require('http-errors');

const validId = (reqOrId, res, next) => {
    const validator = (id) => (req, res, next) => {
        if (/^[0-9a-fA-F]{24}$/.test(req.params[id])) {
            return next();
        }
        return next(new createError(404));
    };
    if (!res && !next) {
        return validator(reqOrId);
    }
    return validator('id')(reqOrId, res, next);
};

const checkCampgroundOwnership = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const campground = await Campground.findById(req.params.id);
            if (campground.author.id.equals(req.user._id)) {
                return next();
            }
        } catch (e) {
            return next(e);
        }
        req.flash('error', 'Operation is not permitted');
        return res.redirect('back');
    } else {
        requireLoggedIn(req, res, next);
    }
};

const isLoggedIn = (req) => req.isAuthenticated();

const ifLoggedIn = url => (req, res, next) => {
    if (isLoggedIn(req)) {
        return next();
    }
    res.status(401).redirect(url);
};

const requireLoggedIn = (req, res, next) => {
    if (isLoggedIn(req)) {
        return next();
    }
    req.session.redirect = req.originalUrl;
    req.flash('error', 'Please Login First!');
    res.status(401).redirect('/login');
};


module.exports = {
    validId,
    checkCampgroundOwnership,
    ifLoggedIn,
    requireLoggedIn
};
