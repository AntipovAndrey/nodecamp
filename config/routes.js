function setupRoutes(app) {
    app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        res.locals.flash = {
            success: req.flash('success'),
            error: req.flash('error'),
        };
        return next();
    });
    app.use('/', require('../routes/index'));
    app.use('/', require('../routes/users'));
    app.use('/campgrounds', require('../routes/campgrounds'));
    app.use('/campgrounds/:campgroundId/comments', require('../routes/comments'));
}

function setupApiRoutes(app) {
    app.use('/api/', require('../api/users'));
    app.use('/api/campgrounds', require('../api/campgrounds'));
}

module.exports = {setupRoutes, setupApiRoutes};
