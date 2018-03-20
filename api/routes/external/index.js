const Product = require('../../models/product')
const Setting = require('../../models/setting')

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        Setting.find({}, function (err, settings) {
            if (err) console.log(err)
            let perPage
            settings.forEach(item => {
                if (item.humanName === 'Products Per Page') {
                    perPage = item.value
                }
            })

            let page = req.param('page') || 1
            Product.find({})
                .sort({ createdAt: -1 })
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
    })

    app.get('/products/:slug', (req, res) => {
        Product.findOne(
            {
                slug: req.params.slug
            },
            (err, product) => {
                if (!product) {
                    res.status.send(404)
                }
                if (err) res.status(400).send(err)

                res.render('product', { product })
            }
        )
    })
    app.get('/error', (req, res) => {
        res.render('error')
    })
}
