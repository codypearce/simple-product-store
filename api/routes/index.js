var express = require('express')
  , router = express.Router()
var Product = require('../models/product');

router.use('/admin', require('./admin'))

router.get('/', function(req, res) {
    Product.find(function(err, products) {
        res.render('index', { products: products })
    })
});

router.post('/products', function(req, res) {
    Product.create({
        title: req.body.title,
        slug: req.body.slug,
        price: req.body.price,
        link: req.body.link,
        imgLink: req.body.imgLink,
        description: req.body.description
    }, function(err, product) {

        if (err) res.send(err);

        Product.find(function(err, products) {
            res.render('admin/index', { products: products })
        })
    });
})

router.get('/products/:slug', (req,res) => {
    Product.find({
        slug: req.params.slug
    }, (err, product) => {
        if(err) res.send(err)

        res.render('product', {product: product[0]})
    })
});


module.exports = router
