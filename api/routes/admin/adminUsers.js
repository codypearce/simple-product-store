const User = require('../../models/user')
const {isLoggedIn} = require('../utils')

module.exports = function (app, passport) {
    // Get User page
    app.get('/admin/users', isLoggedIn, (req, res) => {
        User.find((err, users) => {
            if (err) res.send(err)

            res.render('admin/users', {
                users: users
            })
        })
    })

    // Add user
    app.post('/admin/users/add', passport.authenticate('local-signup', {
        successRedirect: '/admin/users',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    // Get User page
    app.get('/admin/users/add', isLoggedIn, (req, res) => {
        User.find((err, users) => {
            if (err) res.send(err)

            res.render('admin/addUser')
        })
    })

    // Get Profile details
    app.get('/admin/user/profile/:userId', isLoggedIn, (req, res) => {
        User.findOne({ '_id': req.params.userId }, function (err, user) {
            if (err) { throw err }

            res.render('admin/profile', {user: user})
        })
    })

    // Delete User
    app.get('/admin/users/delete/:userId', isLoggedIn, (req, res) => {
        User.remove({
            _id: req.params.userId
        }, function (err, user) {
            if (err) res.send(err)

            res.redirect('/admin/users')
        })
    })
}
