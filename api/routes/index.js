const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.use('/admin', require('./admin'))

router.get('/', function (req, res) {
    Product.find(function (err, products) {
        if (err) res.send(err)

        let sorted = products.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        res.render('index', { products: sorted })
    })
})

router.get('/products/:slug', (req, res) => {
    Product.findOne({
        slug: req.params.slug
    }, (err, product) => {
        if (!product) {
            res.status.send(404)
        }
        if (err) res.status(400).send(err)

        res.render('product', {product: product})
    })
})

module.exports = router
