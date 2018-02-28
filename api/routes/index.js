module.exports = function (app, passport) {
    // Admin
    require('./admin/admin')(app, passport)
    require('./admin/adminUsers')(app, passport)
    require('./admin/auth')(app, passport)
    require('./admin/products')(app, passport)

    // External
    require('./external/index')
}
