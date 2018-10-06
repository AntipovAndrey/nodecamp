const Campground = require('../model/campground');

function getAll() {
    return Campground.find({}).exec();
}

function findById(id) {
    return Campground.findById(id)
        .populate('comments')
        .exec();
}

function create(campground) {
    return Campground.create(campground);
}

function edit(id, campground) {
    return Campground.findByIdAndUpdate(id, campground)
        .exec();
}

function remove(id) {
    return Campground.findByIdAndRemove(id)
        .exec();
}

module.exports = {
    getAll,
    create,
    findById,
    edit,
    remove
};

