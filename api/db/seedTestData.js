const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const testProduct = {
    title: 'test',
    slug: 'test',
    price: 299,
    externalLink: 'http://google.com',
    description: 'this is a test description'
}
const starterData = {
    title: 'product1',
    slug: 'product1',
    price: 150,
    externalLink: 'http://google.com',
    description: 'this is a test description'
}

const testUser = {
    email: 'test@gmail.com',
    password: 'test123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({password: 'test123', access: 'auth'}, 'test').toString()
    }]
}

const populateProducts =  function(done) {
    Product.create({
        title: starterData.title,
        slug: starterData.slug,
        price: starterData.price,
        externalLink: starterData.externalLink,
        description: starterData.description
    }, function(err, product) {
        done()
    })
}

const populateUsers =  function(done) {
    User.create({
        email: testUser.title,
        password: testUser.password,
        tokens: testUser.tokens,
    }, function(err, product) {
        done()
    })
}

module.exports = {
    populateProducts,
    populateUsers,
    testProduct,
    testUser
}
