const User = require('../model/user');

function findById(id) {
    return User.findById(id).exec();
}

module.exports = {findById};
