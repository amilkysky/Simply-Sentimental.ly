import React from 'react'
import axios from 'axios'
import Tweets from './Tweets.jsx'
import Keywords from './Keywords.jsx'
import * as actions from '../../js/actions/actions'
import { connect } from 'react-redux'
import D3Table from './D3.jsx'
require('babel-polyfill')

class Sentimentally extends React.Component {
  constructor (props) {
    super(props)

    this.init = this.init.bind(this)
    this.selectKeywordIdHandler = this.selectKeywordIdHandler.bind(this)
    this.fetchLatest = this.fetchLatest.bind(this)
  }

  componentDidMount () {
    console.log('this.props.profileId chek', this.props.profileId)
    this.init(this.props.profileId)

    setInterval(() => {
      this.updateSentiGraphScores()
    }, 5000)
  }

  init (profileId) {
    console.log('init profileId', profileId)
    axios.get(`/subscriptions/${profileId}`)
      .then((subscriptions) => {
        let keywordIds = subscriptions.data.map(keyword => {
          return keyword.keyword_id
        })
        console.log('keywordIds CHEK 1', keywordIds)
        let keywords = subscriptions.data.map(keyword => {
          return keyword.keyword
        })
        console.log('keywordIds CHEK 2', keywordIds)
        let selectedKeywordId = keywordIds[0]
        console.log('selectedKeywordId CHEK', selectedKeywordId)

        this.props.dispatch(actions.initializeKeywords(keywordIds, keywords, selectedKeywordId))
        this.props.dispatch(actions.fetchTweets(selectedKeywordId))
        this.initializeGraphSentiScores(selectedKeywordId)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async initializeGraphSentiScores (keywordId) {
    console.log('in REACT keywordId chek', keywordId)

    const sentiGraphScores = await axios.get(`/initializeD3/${keywordId}`)
    console.log('in REACT sentiGraphScores chek', sentiGraphScores)
    this.props.dispatch(actions.updateTweetSentiments(sentiGraphScores.data))
  }

  async updateSentiGraphScores () {
    const latestScoresResult = await axios.get(`/updateSentiGraphScores/${this.props.selectedKeywordId}`)

    let latestScores

    if (latestScoresResult.data.length === 0) {
      latestScores = [{sentiment: 0}]
    } else {
      latestScores = latestScoresResult.data
    }

    console.log('in REACT latest chek', latestScores)

    let scores = this.props.update
    scores.splice(scores.length - 1, 1)

    const newScores = scores.map(score => {
      return {date: score.date - 5, close: score.close}
    })

    let totalTweets = latestScores.length
    let averageScore = null

    if (totalTweets === 0) {
      averageScore = 0
    } else {
      const mappedLatestScores = latestScores.map(score => score.sentiment)
      console.log('REACT mappedLatestScores chek', mappedLatestScores)
      console.log('REACT totalTweets chek', totalTweets)

      const summedScore = mappedLatestScores.reduce((total, amount) => total + amount, 0)
      averageScore = Math.ceil(summedScore / totalTweets)
      console.log('REACT averageScore chek', averageScore)
    }

    newScores.unshift({date: -5, close: averageScore})

    this.props.dispatch(actions.updateTweetSentiments(newScores))
  }

  selectKeywordIdHandler (event) {
    let keyword = event.target.value
    console.log('keyword', keyword)
    axios.get(`/keywordId/${keyword}`)
      .then((keywordId) => {
        console.log('keywordId', keywordId)
        this.props.dispatch(actions.changeSelectedKeywordId(keywordId))
        this.initializeGraphSentiScores(keywordId.data[0].id)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchLatest (keywordIdResponse) {
    axios.get(`/subscriptions/${this.props.profileId}`)
      .then((subscriptions) => {
        let keywordIds = subscriptions.data.map(keyword => {
          return keyword.keyword_id
        })
        let keywords = subscriptions.data.map(keyword => {
          return keyword.keyword
        })

        this.props.dispatch(actions.subscribeToKeyword(keywordIds, keywords))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h1>Sentimental.ly</h1>
        <Keywords fetchLatest={this.fetchLatest} profileId={this.props.profileId} selectKeyword={this.selectKeywordIdHandler} keywordsArray={this.props.keywords} />
        <D3Table />
        <Tweets tweetsArray={this.props.tweets} />
      </div>
    )
  }
}

export default connect((state, props) => {
  return {
    profileId: state.keywordSubscription.profileId,
    update: state.d3.update,
    keywordIds: state.keywordSubscription.keywordIds,
    tweets: state.tweets.tweets,
    selectedKeywordId: state.tweets.selectedKeywordId,
    keywords: state.tweets.keywords
  }
})(Sentimentally)