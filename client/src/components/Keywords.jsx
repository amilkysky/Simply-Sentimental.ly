import React from 'react'
import axios from 'axios'
import * as actions from '../../js/actions/actions'
import { connect } from 'react-redux'

class Keywords extends React.Component {
  constructor (props) {
    super(props)

    this.newSubscriptionHandler = this.newSubscriptionHandler.bind(this)
    this.handleKeywordChange = this.handleKeywordChange.bind(this)
  }

  handleKeywordChange (event) {
    const keyword = event.target.value
    this.props.dispatch(actions.keywordInputChange(keyword))
  }

  newSubscriptionHandler () {
    axios.post('/subscribe', {
      keyword: this.props.keywordInput,
      profileId: this.props.profileId
    })
      .then((keywordIdResponse) => {
        this.props.fetchLatest(keywordIdResponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className="keywordsDropdown">
        <textarea type="text" value={this.props.keywordInput} onChange={this.handleKeywordChange} className="keyword-subscribe-textarea" placeholder="Choose a new brand to subscribe to"></textarea>
        <button onClick={(event) => {
          this.newSubscriptionHandler()
        }} className="keyword-submit-button" type="submit">Subscribe</button>

        <select onChange={this.props.selectKeyword} >
          {this.props.keywordsArray.map((keyword, i) => {
            return <option value={keyword} key={i}>{keyword}</option>
          })}
        </select>
        <button onClick={(event) => {
           this.props.dispatch(actions.fetchTweets(this.props.selectedKeywordId))
        }} className="refresh-tweets" type="submit">Refresh Tweets</button>
      </div>
    )
  }
}

export default connect((state, props) => {
  return {
    profileId: state.keywordSubscription.profileId,
    keywordInput: state.keywordSubscription.keywordInput,
    selectedKeywordId: state.tweets.selectedKeywordId
  }
})(Keywords)
