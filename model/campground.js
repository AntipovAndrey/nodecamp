const mongoose = require('mongoose');

const Campground = mongoose.model("Campground", new mongoose.Schema({
    name: String,
    image: String,
    description: String
}));

module.exports = Campground;
