const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { app } = require('../../app')
const Product = require('../models/product')

const {populateProducts, testProduct, testUser} = require('../db/seedTestData')


describe('Admin', () => {
    it('should GET "/admin"')

    before((done) => {
        // Reset product collection before adding
        Product.remove({}, function (err) {
            if (err) throw err
        }).then(() => {
            populateProducts(done)
            // Should remove users beforehand
            populateUsers(done)
        })
    })

    describe('GET /products', (done) => {
        it('should get all products', (done) => {
            chai.request(app)
                .get('/admin/products')
                .end((err, res) => {
                    if (err) console.log('MONGOOSE ERR: ', err.response.body.errmsg)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.length(1)
                    done()
                })
        })
    })

    describe('Create Product', () => {
        it('should GET /admin/product add page')
        it('should create a product without errors', (done) => {
            chai.request(app)
                .post('/admin/products')
                .field('title', testProduct.title)
                .field('slug', testProduct.slug)
                .field('price', testProduct.price)
                .field('externalLink', testProduct.externalLink)
                .field('description', testProduct.description)
                .end((err, res) => {
                    if (err) console.log('MONGOOSE ERR: ', err.response.body.errmsg)
                    expect(res).to.have.status(200)
                    expect(res.body).to.not.equal(null)
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('slug')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('externalLink')
                    expect(res.body).to.have.property('description')
                    done()
                })
        })
        it('should not create a product without data', (done) => {
            chai.request(app)
                .post('/admin/products')
                .end((err, res) => {
                    if (err) expect(err.status).to.equal(400)
                    expect(res).to.have.status(400)
                    done()
                })
        })
        it('should get duplicate key error with slug', (done) => {
            chai.request(app)
                .post('/admin/products')
                .field('title', testProduct.title)
                .field('slug', testProduct.slug)
                .field('price', testProduct.price)
                .field('externalLink', testProduct.externalLink)
                .field('description', testProduct.description)
                .end((err, res) => {
                    if (err) expect(err.response.body.errmsg).to.not.equal(null)
                    expect(res).to.have.status(400)
                    done()
                })
        })
    })
    describe('Edit a product', () => {
        it('should GET "/admin/edit/productID"')
        it('should edit a product')
    })
    describe('Delete a product', () => {
        it('should GET /admin/delete/productID')
        it('should delete a product') // Check if product is no longer in database
        it('should return 404 if no product')
    })
    describe('GET /users/profile', (done) => {
        it('should return user if authenticated', (done) => {
            chai.request(app)
                .get('/admin/users/profile')
                .set('x-auth', testUser.tokens.token)
                .end((err, res) => {
                    if (err) console.log('MONGOOSE ERR: ', err.response.body.errmsg)

                    expect(res).to.have.status(200)
                    expect(res.body.email).toBe(testUser.email)
                })
        })
        it('should return 401 if not authenticated')
    })

})
