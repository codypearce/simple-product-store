const Product = require('../../models/product')

const {isLoggedIn, limitText} = require('../utils')

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
}
