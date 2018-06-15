const dbModule = require('../../db/')
const Twit = require('twit')
const sentiment = require('sentiment')
const { server } = require('../app.js')
require('dotenv').config()

// TODO: Extract database calls to db/knexHelpers.js and import as helper functions
// (for separation of concerns)

const checkIfKeywordExists = async (keyword) => {
  let keywordsArray = await dbModule.knex.select('id', 'keyword').from('keywords')

  let keywordIdResponse = null
  let found = false

  keywordsArray.forEach((keywordObj) => {
    if (keyword === keywordObj.keyword) {
      found = true
      keywordIdResponse = [keywordObj.id]
    }
  })

  const streamKeywordsArray = keywordsArray.map((keywordObj) => {
    return keywordObj.keyword
  })

  return {
    found: found,
    keywordIdResponse: keywordIdResponse,
    streamKeywordsArray: streamKeywordsArray
  }
}

const processUniqueKeyword = async (keyword) => {
  keywordIdResponse = await dbModule.knex('keywords').insert({
    keyword
  })
    .returning('id')

  return keywordIdResponse
}

const getUserSubscriptions = async (profileId) => {
  let subscripsArray = await dbModule.knex('subscriptions').where({'profile_id': profileId}).select('keyword_id', 'profile_id')
  return subscripsArray
}

const checkIfUserHasSubscription = (subscripsArray, keywordIdResponse) => {
  let foundKeywordId = false

  subscripsArray.forEach((subscriptObj) => {
    if (keywordIdResponse[0] === subscriptObj.keyword_id) {
      foundKeywordId = true
    }
  })
  return foundKeywordId
}

const subscribeUserToKeyword = async (profileId, keywordIdResponse) => {
  console.log('profId n keywordIdResp CHEK', profileId, keywordIdResponse)
  let newSubscription = await dbModule.knex('subscriptions').insert({
    profile_id: profileId,
    keyword_id: keywordIdResponse[0]
  })
  .returning('*')
  console.log('newSubscription chek', newSubscription)
}

const activateTwitStreamForAllKeywords = (T, streamKeywordsArray) => {
  const stream = T.stream('statuses/filter', { track: streamKeywordsArray, language: 'en' })
  return stream
}

const addTweetEventPropertiesIfNullData = (tweetEvent) => {
  if (!tweetEvent.retweeted_status) {
    tweetEvent.retweeted_status = {}
    tweetEvent.retweeted_status.retweet_count = 0
  }
  if (!tweetEvent.entities.urls[0]) {
    tweetEvent.entities.urls[0] = {}
    tweetEvent.entities.urls[0].url = 'null'
  }
  return tweetEvent
}

const insertTweetsToDatabase = async (tweetEvent) => {
  const tweetIdResponse = await dbModule.knex('tweets').insert({
    tweeted_at: tweetEvent.created_at,
    url: tweetEvent.entities.urls[0].url,
    text: tweetEvent.text,
    retweet_count: tweetEvent.retweeted_status.retweet_count,
    user_name: tweetEvent.user.name,
    profile_image_url: tweetEvent.user.profile_image_url,
    screenname: tweetEvent.user.screen_name
  })
    .returning('id')
  return tweetIdResponse
}

const calculateTweetSentimentScore = (tweetEvent) => {
  const senti = sentiment(tweetEvent.text)
  const score = senti.score
  return score
}

const insertSentiment = async (score, tweetIdResponse, keywordIdResponse) => {
  const insertedSentiment = await dbModule.knex('sentiments').insert({
    sentiment: score,
    tweet_id: tweetIdResponse[0],
    keyword_id: keywordIdResponse[0]
  })
    .returning('*')
  return insertedSentiment
}

const initDisconnectReconnectTwitStream = (stream) => {
  stream.on('limit', function (limitMessage) {
    console.log('limit message', limitMessage)
  })

  stream.on('disconnect', function (disconnectMessage) {
    console.log('disconnect msg', disconnectMessage)
  })

  stream.on('reconnect', function (request, response, connectInterval) {
    console.log('Reconnecting in ' + connectInterval + 'ms...')
  })

  stream.on('error', function (error) {
    console.log(error)
  })
}

module.exports = {
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
}
