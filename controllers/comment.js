const commentService = require('../services/comment');
const userService = require('../services/user');

async function create(campId, comment, user) {
    if (!user || !userService.findById(user.id)) {
        return Promise.reject(new Error('Not Permitted'));
    }
    comment.author = {
        id: user.id,
        username: user.username
    };
    return commentService.create(campId, comment);
}

module.exports = {create};
