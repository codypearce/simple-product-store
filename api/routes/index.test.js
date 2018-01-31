const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { app } = require('../../app')

describe('Index', () => {
    it('should return with homepage', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) throw err
                expect(res).to.have.status(200)
                expect(res.body).to.not.equal(null)
                done()
            })
    })
    it('should return with correct product page')
})
