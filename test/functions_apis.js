const { server } = require('../server/index.js')
const chai = require('chai')
const { expect } = require('chai')
const Twit = require('twit')
const chaiHttp = require('chai-http')
const { makeDatetimeString } = require('../db/timestampHelper.js')

chai.use(chaiHttp)

let connected = false

describe('APIs', () => {
  before(() => {
  })
  after(() => {
    server.close(() => console.log(`server no longer listening on port ${process.env.PORT}`))
  })

  describe('Twit API', () => {
    before(() => {
      var T = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET,
        timeout_ms: 60 * 1000
      })
      let stream = T.stream('statuses/filter', 'Disney')
      stream.on('connected', function (response) {
        connected = true
      })
    })

    it('connects to Twitter stream', () => {
      setTimeout(() => {
        expect(connected).to.equal(true)
        connected = false
      }, 3000)
    })
  })
})

describe('Functions', () => {
  describe('makeDatetimeString', () => {
    const testDate0 = new Date('March 17, 2018 03:06:00')
    const testDate1 = new Date('March 17, 2018 03:00:00')
    const testDate2 = new Date('March 17, 2018 00:00:00')
    const testDate3 = new Date('March 1, 2018 00:00:00')
    const testDate4 = new Date('January 1, 2018 00:00:00')

    it('should return current datetime', async () => {
      const date = makeDatetimeString(testDate0).time1MinAgo
      expect(date).to.equal('2018/03/17 03:05:00')
    })
    it('should properly subtract hours when there are less than 5 minutes', async () => {
      const date = makeDatetimeString(testDate1).time1MinAgo
      expect(date).to.equal('2018/03/17 02:59:00')
    })
    it('should properly subtract days when there are less than 1 hour', async () => {
      const date = makeDatetimeString(testDate2).time1MinAgo
      expect(date).to.equal('2018/03/16 23:59:00')
    })
    it('should properly subtract months when its the first day of the month', async () => {
      const date = makeDatetimeString(testDate3).time1MinAgo
      expect(date).to.equal('2018/02/28 23:59:00')
    })
    it('should properly subtract years when its the first month of the year', async () => {
      const date = makeDatetimeString(testDate4).time1MinAgo
      expect(date).to.equal('2017/12/31 23:59:00')
    })
  })
})