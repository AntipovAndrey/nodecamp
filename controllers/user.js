const userService = require('../services/user');

function register(user) {
    return userService.register(user);
}

function createToken(id) {
    return userService.createToken(id);
}

module.exports = {register, createToken};
