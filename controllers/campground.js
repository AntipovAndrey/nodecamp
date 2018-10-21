const campgroundService = require('../services/campground');
const userService = require('../services/user');
const config = require('../config');

function getAll(pageInfo = {}) {
    if (!pageInfo.pageSize) {
        pageInfo.pageSize = config.campgrounds.pageSize;
    }
    return campgroundService.getAll(pageInfo);
}

function findById(id) {
    return campgroundService.findById(id);
}

function create(campground, user) {
    if (!user || !userService.findById(user.id)) {
        return Promise.reject(new Error('Not Permitted'));
    }
    campground.author = {
        id: user.id,
        username: user.username
    };
    return campgroundService.create(campground);
}

async function edit(id, campground, user) {
    if (!user || !await allowed(id, user.id)) {
        return Promise.reject(new Error('Not Permitted'));
    }
    const data = {
        name: campground.name,
        image: campground.image,
        description: campground.description
    };
    return campgroundService.edit(id, data);
}

async function remove(id, user) {
    if (!user || !await allowed(id, user.id)) {
        return Promise.reject(new Error('Not Permitted'));
    }
    return campgroundService.remove(id);
}

async function allowed(campId, userId) {
    const campground = await findById(campId);
    return campground.author.id.equals(userId);
}

module.exports = {
    getAll,
    create,
    findById,
    edit,
    remove
};
