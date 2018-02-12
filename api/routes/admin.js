const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const path = require('path')
let {authenticate} = require('../middleware/authenticate')

var multer = require('multer')
var dest = 'client/productImages/'
var storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('imageUpload')

function checkFileType (file, cb) {
    // Allowed Ext
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        return cb('Error: Images only')
    }
}

router.get('/', function (req, res) {
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

router.get('/login', function (req, res) {
    res.render('admin/login')
})
router.get('/signup', function (req, res) {
    res.render('admin/signup')
})

// Get User page
router.get('/users', (req, res) => {
    User.find((err, users) => {
        if (err) res.send(err)

        res.render('admin/users', {
            users: users
        })
    })
})

// Create a User Route
router.post('/users', function (req, res) {
    var body = req.body
    User.create({
        email: body.email,
        password: body.password
    }, function (err, user) {
        if (err) {
            console.log(err)
            return res.sendStatus(400)
        }

        console.log(user)
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    })
})

// Get Profile details
router.get('/users/profile', authenticate, (req, res) => {
    console.log(req.user)
    res.send(req.user)
})

// Login user
router.post('/login', (req, res) => {
    var body = req.body
    var user = {
        email: body.email,
        password: body.password
    }
    User.findByCredentials(user.email, user.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        console.log('failed to login')
        res.send(400)
    })
})

// Log out Route
router.delete('/users/profile/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.send(200)
    }, () => {
        res.send(401)
    })
})
// Delete User
router.get('/users/delete/:userId', (req, res) => {
    User.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err) res.send(err)

        res.redirect('/admin/users')
    })
})

router.get('/products', function (req, res) {
    Product.find(function (err, products) {
        if (err) res.send(err)

        let sorted = products.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        res.send(sorted)
    })
})

router.post('/products', function (req, res) {
    let imgName
    upload(req, res, (err) => {
        if (err) {
            res.send(err)
        } else {
            if (req.file) {
                imgName = req.file.filename
            }
            Product.create({
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price,
                externalLink: req.body.externalLink,
                imgLink: imgName,
                description: req.body.description
            }, function (err, product) {
                if (err) {
                    return res.status(400).send(err)
                }
                return res.send(product)
            })
        }
    })
})

router.get('/product/add', function (req, res) {
    res.render('admin/add')
})

router.get('/product/edit/:productID', (req, res) => {
    Product.findById(req.params.productID, (err, product) => {
        if (err) res.send(err)

        res.render('admin/edit', {product: product})
    })
})

router.post('/product/edit/:productID', function (req, res) {
    let imgName
    upload(req, res, (err) => {
        if (err) {
            res.send(err)
        } else {
            if (req.file) {
                imgName = req.file.filename
            } else {
                imgName = req.body.originalImgLink
            }
            Product.update({_id: req.params.productID}, {
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price,
                externalLink: req.body.externalLink,
                imgLink: imgName,
                description: req.body.description
            }, function (err, product) {
                if (err) res.send(err)

                res.redirect('/admin')
            })
        }
    })
})

router.get('/product/delete/:productID', function (req, res) {
    Product.remove({
        _id: req.params.productID
    }, function (err, product) {
        if (err) res.send(err)

        res.redirect('/admin')
    })
})

function limitText (arr, amount) {
    arr.forEach(function (product) {
        if (product.description.length > amount) {
            product.description = product.description.substring(0, amount).trim() + '...'
        }
    })
}

module.exports = router
