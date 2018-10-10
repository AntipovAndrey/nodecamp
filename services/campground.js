const Campground = require('../model/campground');

async function getAll(pageInfo) {
    let next;
    if (pageInfo.page) {
        next = new Date(Number(pageInfo.page));
    } else {
        next = Date.now()
    }
    console.log(next);
    const campgrounds = await Campground
        .find({
            updated: {
                $lt: next
            }
        })
        .sort({'updated': -1})
        .limit(Number(pageInfo.pageSize))
        .exec();

    const result = {
        campgrounds: campgrounds
    };

    if (campgrounds.length > 0) {
        result.next = campgrounds[campgrounds.length - 1].updated.getTime();
    }
    return result;
}

function findById(id) {
    return Campground.findById(id)
        .populate('comments')
        .exec();
}

function create(campground) {
    return Campground.create(campground);
}

// TODO: replace to pre-hook
function edit(id, campground) {
    campground.updated = Date.now();
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
