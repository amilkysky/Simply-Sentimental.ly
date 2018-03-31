const express = require('express');
const router = express.Router();

const { makeDatetimeString } = require('../../db/timestampHelper.js')
const twitter = require('../api/twitter')
// const { app } = require('../app.js')

const knexHelpers = require('../../db/knexHelpers')

router.post('/subscribe', async (req, res) => {
  try {
    const keyword = req.body.keyword
    const profileId = req.body.profileId
    const keywordIdResponse = await twitter.createSubscription(keyword, profileId)
    res.send(keywordIdResponse)
  } catch (error) {
    console.log('Could not save data')
    console.log(error)
    res.sendStatus(400)
  }
})

router.get('/keywordId/:keyword', async (req, res) => {
  const keywordId = await knexHelpers.getKeywordIdByKeyword(req.params.keyword)
  res.send(keywordId)
})


router.get('/subscriptions/:profile_id', async (req, res) => {

  const subscriptions = await knexHelpers.getSubscriptionsByUserId(req.params.profile_id)

  res.send(subscriptions)
})

router.get('/tweets/:keyword_id', async (req, res) => {
  const tweets = await knexHelpers.getTweetsByKeyword(req.params.keyword_id)
  res.send(tweets)
})

router.get('/sentiments/:keyword_id', async (req, res) => {
  const sentiments = await knexHelpers.getSentimentsByKeyword(req.params.keyword_id)

  res.send(sentiments)
})

router.get('/initializeD3/:keyword', async (req, res) => {
  let sentiGraphScores = []

  let timeStampObj = makeDatetimeString()
  const mostRecentScore = await knexHelpers.getLatestSentimentsByKeyword(req.params.keyword, timeStampObj)
  const filteredRecentScores = mostRecentScore.filter(score => score.sentiment !== 0)
  let totalRecentTweets = mostRecentScore.length
  let averageRecentScore = null

  if (totalRecentTweets === 0) {
    averageRecentScore = 0
  } else {
    const mappedmostRecentScore = filteredRecentScores.map(score => score.sentiment)
    const summedRecentScore = mappedmostRecentScore.reduce((total, amount) => total + amount, 0)
    averageRecentScore = Math.ceil(summedRecentScore / totalRecentTweets)
  }

  let date = -5

  sentiGraphScores.push({date: date, close: averageRecentScore})

  for (let i = 0; i < 11; i++) {
    const pastScore = await knexHelpers.getSentimentsByKeywordWithinTimePeriod(req.params.keyword, timeStampObj)
    let totalTweets = pastScore.length
    let averageScore = null

    if (totalTweets === 0) {
      averageScore = 0
    } else {
      const mappedPastScore = pastScore.map(score => score.sentiment)
      const summedScore = mappedPastScore.reduce((total, amount) => total + amount, 0)
      averageScore = Math.ceil(summedScore / totalTweets)
    }

    date -= 5
    sentiGraphScores.push({date: date, close: averageScore})
    timeStampObj = makeDatetimeString(timeStampObj.time5MinAgo)
  }
  res.send(sentiGraphScores)
})

router.get('/updateSentiGraphScores/:selectedKeywordId', async (req, res) => {
  const mostRecentSentimentScores = await knexHelpers.getLatestSentimentsByKeyword(req.params.selectedKeywordId, makeDatetimeString())
  const filteredSentimentScores = mostRecentSentimentScores.filter(score => score.sentiment !== 0)
  res.send(filteredSentimentScores)
})

module.exports = {
  router
};
