
module.exports = function (app, passport) {
    app.get('/admin/login', function (req, res) {
        var message = req.flash('loginMessage')[0]
        console.log(message)
        return res.render('admin/auth/login', {message})
    })
    app.get('/admin/signup', function (req, res) {
        var message = req.flash('signupMessage')[0]
        res.render('admin/auth/signup', {message})
    })

    app.post('/admin/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/admin/signup',
        failureFlash: true
    }))
    app.post('/admin/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
    }))

    app.get('/admin/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })
}
