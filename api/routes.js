var Product = require('./models/product');

module.exports = function(app) {


    app.get('/', function(req, res) {
        Product.find(function(err, products) {
            res.render('index', { products: products })
        })
    });

    app.get('/products/:slug', (req,res) => {
        Product.find({
            slug: req.params.slug
        }, (err, product) => {
            if(err) res.send(err)

            res.render('product', {product: product[0]})
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

    app.get('/admin/product/edit/:productID', (req,res) => {
        Product.findById(req.params.productID, (err, product) => {
            if(err) res.send(err)

            res.render('admin/edit', {product: product})
        })
    });

    app.post('/products', function(req, res) {
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

    app.post('/admin/product/edit/:productID', function(req, res) {
        Product.update({_id: req.params.productID}, {
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
