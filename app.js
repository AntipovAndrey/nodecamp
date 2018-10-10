const express = require('express');
const app = express();

require('./config/application').setupApplication(app);
require('./config/database').setupConnection();
require('./config/passport').setupPassport(app);
require('./config/handlebars').setupHandlebars(app);
require('./config/routes').setupRoutes(app);
require('./config/routes').setupApiRoutes(app);
require('./config/application').setupErrorHandler(app);

module.exports = app;
