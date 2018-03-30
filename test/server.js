const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { server } = require('../server/index.js')
require('dotenv').config()
chai.use(chaiHttp)

describe('Server Routes', () => {
  before(() => {
    console.log('')
  })
  after(() => {
    server.close(() => console.log(`server no longer listening on port ${process.env.PORT}`))
  })

  describe('Route: GET /', () => {
    it('should return the content of index.ejs', (done) => {
      chai
        .request(server)
        .get(`/`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
          done()
        })
    }).timeout(1000)
    it('should return the content of styles.css', (done) => {
      chai
        .request(server)
        .get(`/dist/styles.css`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', /css/)
          done()
        })
    }).timeout(1000)
    it('should return the content of bundle.js', (done) => {
      chai
        .request(server)
        .get(`/dist/bundle.js`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type', /javascript/)
          done()
        })
    }).timeout(1000)
  })

  describe('Route: GET /missingendpoint', () => {
    it('should return 404', (done) => {
      chai
        .request(server)
        .get(`/missingendpoint`)
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    }).timeout(1000)
  })
})
