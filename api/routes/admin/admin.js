const Product = require('../../models/product')
const Setting = require('../../models/setting')
const {isLoggedIn, limitText} = require('../utils')

module.exports = function (app, passport) {
    app.get('/admin', isLoggedIn, function (req, res) {
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
                .sort({'createdAt': -1})
                .skip(perPage * (page - 1))
                .limit(perPage)
                .exec(function (err, products) {
                    if (err) console.log(err)
                    limitText(products, 100)
                    Product.count().exec(function (err, count) {
                        if (err) console.log(err)
                        res.render('admin/index', {
                            products,
                            page: page,
                            pages: Math.ceil(count / perPage),
                            count
                        })
                    })
                })
        })
    })
}
