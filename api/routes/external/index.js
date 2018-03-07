const Product = require('../../models/product')

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        Product.find({})
            .sort({'createdAt': -1})
            .limit(20)
            .exec(function (err, products) {
                if (err) console.log(err)

                res.render('index', { products })
            })
    })

    app.get('/products/:slug', (req, res) => {
        Product.findOne({
            slug: req.params.slug
        }, (err, product) => {
            if (!product) {
                res.status.send(404)
            }
            if (err) res.status(400).send(err)

            res.render('product', {product})
        })
    })
}
