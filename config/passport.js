const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local');
const passport = require('passport');
const config = require('../config');
const User = require('../model/user');

function setupPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt.secret,
            passReqToCallback: true
        },
        (req, jwtPayload, cb) => {
            req.user = jwtPayload;
            cb(null, jwtPayload);
        }
    ));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = {setupPassport};
