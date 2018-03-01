
module.exports = function (app, passport) {
    app.get('/admin/login', function (req, res) {
        res.render('admin/auth/login')
    })
    app.get('/admin/signup', function (req, res) {
        res.render('admin/auth/signup')
    })

    app.post('/admin/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/signup',
        failureFlash: true
    }))
    app.post('/admin/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/admin/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })
}
