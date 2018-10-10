const mongoose = require('mongoose');

const config = require('../config');

function setupConnection() {
    mongoose.set('useFindAndModify', false);
    return mongoose.connect(config.db.url, {useNewUrlParser: true});
}

module.exports = {setupConnection};
