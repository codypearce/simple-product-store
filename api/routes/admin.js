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

      let sorted = products.sort(function(a,b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
      })
      res.render('admin/index', {
          products: sorted
      })
  })
});


router.post('/products', function (req, res) {
    let imgName;
    upload(req, res, (err) => {
        if(err) {
            res.send(err)
        } else {
            if(req.file) {
                imgName = req.file.filename;
            }
            Product.create({
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price,
                externalLink: req.body.externalLink,
                imgLink: imgName,
                description: req.body.description
            }, function(err, product) {

                if (err) res.send(err);

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
    let imgName;
    upload(req, res, (err) => {
        if(err) {
            res.send(err)
        } else {
            if(req.file) {
                imgName = req.file.filename;
            } else {
                imgName = req.body.originalImgLink;
            }
            Product.update({_id: req.params.productID}, {
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price,
                externalLink: req.body.externalLink,
                imgLink: imgName,
                description: req.body.description
            }, function(err, product) {

                if (err) res.send(err);

                res.redirect('/admin');
            });
        }
    })
})


router.get('/product/delete/:productID', function(req, res) {
    Product.remove({
        _id: req.params.productID
    },function(err, product) {
        res.redirect('/admin')
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
