const hbs = require('hbs');
const path = require('path');

function setupHandlebars(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'hbs');
    hbs.registerPartials(path.join(__dirname, '..', 'views/partials'));
    hbs.registerHelper('concat', (...args) => args.slice(0, -1).join(''));
}

module.exports = {setupHandlebars};
