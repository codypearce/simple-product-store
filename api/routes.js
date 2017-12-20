var Product = require('./models/product');

module.exports = function(app) {


    app.get('/', function(req, res) {
        Product.find(function(err, products) {
            res.render('index', {
                products: products
            })
            console.log(products)
        })
    });


	app.get('/admin', function(req, res) {
        Product.find(function(err, products) {
            res.render('admin/index', {
                products: products
            })
        })
    });

    app.get('/admin/product/add', function(req, res) {
    	res.render('admin/add');
    });

    app.post('/products', function(req, res) {
        Product.create({
            title: req.body.title,
            slug: req.body.slug,
            price: req.body.price,
            link: req.body.link,
            image: req.body.image,
            description: req.body.description
        }, function(err, todo) {
            if (err)
                res.send(err);
                Product.find(function(err, products) {
                    res.render('admin/index', {
                        products: products
                    })
                })
        });
    })

    app.get('/admin/product/delete/:productID', function(req, res) {
        Product.remove({
            _id: req.params.productID
        },function(err, products) {
            res.render('admin/index', {
                products: products
            })
        })
    });


    app.get('*', function(req, res) {
        res.render('error');
    });
}
