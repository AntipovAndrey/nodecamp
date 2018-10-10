const User = require('../model/user');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

function findById(id) {
    return User.findById(id).exec();
}

function register(user) {
    return User.register({username: user.username}, user.password);
}

async function createToken(id) {
    const user = await findById(id);
    const payload = {
        id: user._id,
        username: user.username
    };
    return {
        token: jwt.sign(payload, config.jwt.secret)
    };
}

module.exports = {findById, register, createToken};
