const dbModule = require('../../db/')
const Twit = require('twit')
const sentiment = require('sentiment')
const { server } = require('../app.js')
require('dotenv').config()
const {
  checkIfKeywordExists,
  processUniqueKeyword,
  getUserSubscriptions,
  checkIfUserHasSubscription,
  subscribeUserToKeyword,
  activateTwitStreamForAllKeywords,
  addTweetEventPropertiesIfNullData,
  insertTweetsToDatabase,
  calculateTweetSentimentScore,
  insertSentiment,
  initDisconnectReconnectTwitStream
} = require('./twitterApiHelpers.js')

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  timeout_ms: 60 * 1000
})

const createSubscription = async (keyword, profileId) => {
  try {
    const keywordInfoObj = await checkIfKeywordExists(keyword)
    const exists = keywordInfoObj.found

    let keywordIdResponse = keywordInfoObj.keywordIdResponse
    let streamKeywordsArray = keywordInfoObj.streamKeywordsArray

    if (!exists) {
      keywordIdResponse = await processUniqueKeyword(keyword)
      streamKeywordsArray.push(keyword)
    }

    const subscripsArray = await getUserSubscriptions(profileId)


    const keywordIdExists = checkIfUserHasSubscription(subscripsArray, keywordIdResponse)

    console.log('keywordIdExists cheK', keywordIdExists)

    if (!keywordIdExists) {
      subscribeUserToKeyword(profileId, keywordIdResponse)
    }

    const stream = activateTwitStreamForAllKeywords(T, streamKeywordsArray)

    setTimeout(() => {
      stream.on('tweet', async (tweetEvent) => {
        tweetEvent = addTweetEventPropertiesIfNullData(tweetEvent)
        const tweetIdResponse = await insertTweetsToDatabase(tweetEvent)
        const score = calculateTweetSentimentScore(tweetEvent)
        const insertedSentiment = await insertSentiment(score, tweetIdResponse, keywordIdResponse)
      })

      initDisconnectReconnectTwitStream(stream)
    }, 2000)
    return keywordIdResponse
  } catch (error) {
    console.log(error)
  }
}

module.exports.createSubscription = createSubscription
