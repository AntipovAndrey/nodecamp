const passport = require('passport');

const requireLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err || !user) {
            return res.status(401).end();
        }
        return next();
    })(req, res, next)
};

module.exports = {requireLoggedIn};
