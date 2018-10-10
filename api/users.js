const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
        if (err) {
            return next(err);
        } else if (info) {
            return res.status(401).json({error: 'unauthorized', info});
        }
        res.json(await userController.createToken(user._id));
    })(req, res, next);
});

module.exports = router;
