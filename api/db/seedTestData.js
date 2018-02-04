const Product = require('../models/product')

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

module.exports = {
    populateProducts,
    testProduct
}
