const Comment = require('../model/comment');
const campgroundService = require('./campground');

async function create(campId, comment) {
    let campground = campgroundService.findById(campId);
    let created = Comment.create(comment);
    campground = await campground;
    created = await created;
    if (!campground || !created) {
        return null;
    }
    campground.comments.push(created);
    campground.save();
    return created;
}

module.exports = {create};
