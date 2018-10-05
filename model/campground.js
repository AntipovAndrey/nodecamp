const mongoose = require('mongoose');
const Comment = require('./comment');

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// TODO: fix cascade deletion
campgroundSchema.pre('remove', async (next) => {
    try {
        console.log(this._id);
        await Comment.deleteMany({
            _id: {
                $in: this.comments
            }
        });
    } catch (e) {
        return next(e);
    }
    next();
});

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
