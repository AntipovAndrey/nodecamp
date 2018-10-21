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
    ],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

campgroundSchema.pre('remove', async function (next) {
    try {
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
