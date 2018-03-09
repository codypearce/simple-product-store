const Product = require('../../models/product')
const Settings = require('../../config/settings')

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        let perPage = Settings.productsPerPage
        let page = req.param('page') || 1
        Product.find({})
            .sort({'createdAt': -1})
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec(function (err, products) {
                if (err) console.log(err)
                Product.count().exec(function (err, count) {
                    if (err) console.log(err)
                    res.render('index', {
                        products,
                        page: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
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
