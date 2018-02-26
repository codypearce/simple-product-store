const express = require('express')
const Product = require('../models/product')
const User = require('../models/user')
const path = require('path')
const {isLoggedIn, limitText} = require('./utils')

var multer = require('multer')
var dest = 'client/productImages/'
var storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('imageUpload')

function checkFileType (file, cb) {
    // Allowed Ext
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        return cb('Error: Images only')
    }
}

module.exports = function (app, passport) {
    app.get('/admin', isLoggedIn, function (req, res) {
        Product.find(function (err, products) {
            if (err) res.send(err)

            limitText(products, 100)

            let sorted = products.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            res.render('admin/index', {
                products: sorted
            })
        })
    })

    app.get('/admin/login', function (req, res) {
        res.render('admin/login')
    })
    app.get('/admin/signup', function (req, res) {
        res.render('admin/signup')
    })

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

    // Delete User
    app.get('/admin/users/delete/:userId', isLoggedIn, (req, res) => {
        User.remove({
            _id: req.params.userId
        }, function (err, user) {
            if (err) res.send(err)

            res.redirect('/admin/users')
        })
    })

    app.get('/admin/products', isLoggedIn, function (req, res) {
        Product.find(function (err, products) {
            if (err) res.send(err)

            let sorted = products.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            res.send(sorted)
        })
    })

    app.post('/admin/products', isLoggedIn, function (req, res) {
        let imgName
        upload(req, res, (err) => {
            if (err) {
                res.send(err)
            } else {
                if (req.file) {
                    imgName = req.file.filename
                }
                Product.create({
                    title: req.body.title,
                    slug: req.body.slug,
                    price: req.body.price,
                    externalLink: req.body.externalLink,
                    imgLink: imgName,
                    description: req.body.description
                }, function (err, product) {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    return res.send(product)
                })
            }
        })
    })

    app.get('/admin/product/add', isLoggedIn, function (req, res) {
        res.render('admin/add')
    })

    app.get('/admin/product/edit/:productID', isLoggedIn, (req, res) => {
        Product.findById(req.params.productID, (err, product) => {
            if (err) res.send(err)

            res.render('admin/edit', {product: product})
        })
    })

    app.post('/admin/product/edit/:productID', isLoggedIn, function (req, res) {
        let imgName
        upload(req, res, (err) => {
            if (err) {
                res.send(err)
            } else {
                if (req.file) {
                    imgName = req.file.filename
                } else {
                    imgName = req.body.originalImgLink
                }
                Product.update({_id: req.params.productID}, {
                    title: req.body.title,
                    slug: req.body.slug,
                    price: req.body.price,
                    externalLink: req.body.externalLink,
                    imgLink: imgName,
                    description: req.body.description
                }, function (err, product) {
                    if (err) res.send(err)

                    res.redirect('/admin')
                })
            }
        })
    })

    app.get('/admin/product/delete/:productID', isLoggedIn, function (req, res) {
        Product.remove({
            _id: req.params.productID
        }, function (err, product) {
            if (err) res.send(err)

            res.redirect('/admin')
        })
    })
}
