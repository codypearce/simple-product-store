const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { app } = require('../../app')
const Product = require('../models/product')

describe('Admin', () => {
    describe('Create Product', () => {
        it('should create a product without errors', (done) => {
            const testProduct = {
                title: 'test',
                slug: 'test',
                price: 299,
                externalLink: 'http://google.com',
                description: 'this is a test description'
            }

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
                    done()
                })
        })
        it('should get duplicate key error with slug')
    })
})
