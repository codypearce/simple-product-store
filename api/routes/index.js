const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.use('/admin', require('./admin'))

router.get('/', function (req, res) {
    Product.find(function (err, products) {
        if (err) res.send(err)

        res.render('index', { products: products })
    })
})

router.get('/products/:slug', (req, res) => {
    Product.findOne({
        slug: req.params.slug
    }, (err, product) => {
        if (err) res.send(err)

        res.render('product', {product: product})
    })
})

module.exports = router
