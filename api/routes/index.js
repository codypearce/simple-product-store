var express = require('express')
  , router = express.Router()
var Product = require('../models/product');

router.use('/admin', require('./admin'))

router.get('/', function(req, res) {
    Product.find(function(err, products) {
        res.render('index', { products: products })
    })
});


router.get('/products/:slug', (req,res) => {
    Product.findOne({
        slug: req.params.slug
    }, (err, product) => {
        if(err) res.send(err)

        res.render('product', {product: product})
    })
});


module.exports = router
