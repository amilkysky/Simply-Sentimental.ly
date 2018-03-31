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
    this.init(this.props.profileId)

    setInterval(() => {
      this.updateSentiGraphScores()
    }, 60000)
  }

  init (profileId) {
    axios.get(`/subscriptions/${profileId}`)
      .then((subscriptions) => {
        let keywordIds = subscriptions.data.map(keyword => {
          return keyword.keyword_id
        })
        let keywords = subscriptions.data.map(keyword => {
          return keyword.keyword
        })
        let selectedKeywordId = keywordIds[0]

        this.props.dispatch(actions.initializeKeywords(keywordIds, keywords, selectedKeywordId))
        this.props.dispatch(actions.fetchTweets(selectedKeywordId))
        this.initializeGraphSentiScores(selectedKeywordId)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async initializeGraphSentiScores (keywordId) {
    const sentiGraphScores = await axios.get(`/initializeD3/${keywordId}`)
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

    let scores = this.props.update
    scores.splice(scores.length - 1, 1)

    const newScores = scores.map(score => {
      return {date: score.date - 1, close: score.close}
    })

    let totalTweets = latestScores.length
    let averageScore = null

    if (totalTweets === 0) {
      averageScore = 0
    } else {
      const mappedLatestScores = latestScores.map(score => score.sentiment)

      const summedScore = mappedLatestScores.reduce((total, amount) => total + amount, 0)
      averageScore = Math.ceil(summedScore / totalTweets)
    }

    if (averageScore > 5) {
      averageScore = 5
    }
    if (averageScore < -5) {
      averageScore = -5
    }

    newScores.unshift({date: -1, close: averageScore})

    this.props.dispatch(actions.updateTweetSentiments(newScores))
  }

  selectKeywordIdHandler (event) {
    let keyword = event.target.value
    axios.get(`/keywordId/${keyword}`)
      .then((keywordId) => {
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