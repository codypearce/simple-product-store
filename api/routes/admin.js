const express = require('express')
const Product = require('../models/product')
const User = require('../models/user')
const path = require('path')

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
    app.get('/admin', function (req, res) {
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
    app.post('/admin/users/add', function (req, res) {
        var body = req.body
        User.create({
            email: body.email,
            password: body.password
        }, function (err, user) {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }

            res.render('admin/users')
        })
    })

    // Get User page
    app.get('/admin/users/add', (req, res) => {
        User.find((err, users) => {
            if (err) res.send(err)

            res.render('admin/addUser')
        })
    })

    // Get Profile details
    app.get('/admin/users/profile', (req, res) => {
        console.log(req.user)
        res.send(req.user)
    })

    app.post('/admin/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin/',
        failureRedirect: '/signup',
        failureFlash: true
    }))
    app.post('/admin/login', passport.authenticate('local-login', {
        successRedirect: '/admin/',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.post('/admin/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    // Delete User
    app.get('/admin/users/delete/:userId', (req, res) => {
        User.remove({
            _id: req.params.userId
        }, function (err, user) {
            if (err) res.send(err)

            res.redirect('/admin/users')
        })
    })

    app.get('/admin/products', function (req, res) {
        Product.find(function (err, products) {
            if (err) res.send(err)

            let sorted = products.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            res.send(sorted)
        })
    })

    app.post('/admin/products', function (req, res) {
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

    app.get('/admin/product/add', function (req, res) {
        res.render('admin/add')
    })

    app.get('/admin/product/edit/:productID', (req, res) => {
        Product.findById(req.params.productID, (err, product) => {
            if (err) res.send(err)

            res.render('admin/edit', {product: product})
        })
    })

    app.post('/admin/product/edit/:productID', function (req, res) {
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

    app.get('/admin/product/delete/:productID', function (req, res) {
        Product.remove({
            _id: req.params.productID
        }, function (err, product) {
            if (err) res.send(err)

            res.redirect('/admin')
        })
    })
}
function limitText (arr, amount) {
    arr.forEach(function (product) {
        if (product.description.length > amount) {
            product.description = product.description.substring(0, amount).trim() + '...'
        }
    })
}

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { return next() }

    res.redirect('/')
}
