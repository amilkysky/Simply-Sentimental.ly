const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = require('chai')
const { server } = require('../server/index.js')
require('dotenv').config()
const knexHelpers = require('../db/knexHelpers.js')
chai.use(chaiHttp)

describe('Database', () => {
  before(() => {
    console.log('')
  })
  after(() => {
    server.close(() => console.log(`Server no longer listening on port ${process.env.PORT}`))
  })

  describe('Table: keywords', () => {
    it('should return an array of keywords saved in the database', (done) => {
      knexHelpers.getSubscriptionsByUserId(1)
        .then(subscriptions => {
          expect(subscriptions[0].id).to.be.a('number')
          expect(subscriptions).to.be.a('array')
          done()
        })
    }).timeout(1000)

    it('should return nothing for invalid data not in database', (done) => {
      knexHelpers.getSubscriptionsByUserId(null)
        .then(subscription => {
          expect(subscription).to.have.lengthOf(0)
          done()
        })
    }).timeout(1000)
  })
})
