const Product = require('../../models/product')

const {upload} = require('../uploadFiles')
const {isLoggedIn} = require('../utils')
const Setting = require('../../models/setting')

module.exports = function (app, passport) {
    app.get('/admin/products/settings', isLoggedIn, function (req, res) {
        Setting.find(function (err, settings) {
            if (err) console.log(err)

            res.render('admin/products/settings', {settings})
        })
    })
    app.post('/admin/products/settings/update/:settingId', isLoggedIn, function (req, res) {
        Setting.update({_id: req.params.settingId}, {
            value: req.body[req.params.settingId]
        }, function (err, setting) {
            if (err) res.send(err)

            Setting.find(function (err, settings) {
                if (err) console.log(err)

                res.render('admin/products/settings', {settings})
            })
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
                    categories: req.body.categories,
                    imgLink: imgName,
                    description: req.body.description
                }, function (err, product) {
                    if (err) {
                        console.log(err)
                        return res.status(400).send(err)
                    }

                    return res.redirect('/admin')
                })
            }
        })
    })

    app.get('/admin/product/add', isLoggedIn, function (req, res) {
        res.render('admin/products/add')
    })

    app.get('/admin/product/edit/:productID', isLoggedIn, (req, res) => {
        Product.findById(req.params.productID, (err, product) => {
            if (err) res.send(err)

            res.render('admin/products/edit', {product: product})
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
                    categories: req.body.categories,
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

    app.get('/admin/products/slug/:slug', isLoggedIn, function (req, res) {
        Product.findOne({slug: req.params.slug}, (err, product) => {
            if (err) res.send(err)
            console.log(product)
            if (product) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
    })
}
