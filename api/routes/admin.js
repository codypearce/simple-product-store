var express = require('express'),
    router = express.Router(),
    Product = require('../models/product')
var path = require('path');
var multer  = require('multer');
var dest = 'client/productImages/';
var storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('imageUpload');
function checkFileType(file, cb) {
    // Allowed Ext
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        return cb('Error: Images only')
    }
}
router.get('/', function(req, res) {
  Product.find(function(err, products) {
      limitText(products, 100)
      res.render('admin/index', {
          products: products
      })
  })
});


router.post('/products', function (req, res) {
    let imgName;
    upload(req, res, (err) => {
        if(err) {
            return console.log(err)

        } else {

            imgName = req.file.filename;
            Product.create({
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price,
                link: req.body.link,
                imgLink: imgName,
                description: req.body.description
            }, function(err, product) {

                if (err) res.send(err);

                Product.find(function(err, products) {
                    res.render('admin/index', { products: products })
                })
            });
        }
    })

})

router.get('/product/add', function(req, res) {
    res.render('admin/add');
});

router.get('/product/edit/:productID', (req,res) => {
  Product.findById(req.params.productID, (err, product) => {
      if(err) res.send(err)

      res.render('admin/edit', {product: product})
  })
});

router.post('/product/edit/:productID', function(req, res) {
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


router.get('/product/delete/:productID', function(req, res) {
    Product.remove({
        _id: req.params.productID
    },function(err, products) {
        res.render('admin/index', {
            products: products
        })
    })
});


function limitText(arr, amount) {
    arr.forEach(function(product) {
        if(product.description.length > amount) {
            product.description = product.description.substring(0, amount).trim() + '...';
        }
    })
}

module.exports = router