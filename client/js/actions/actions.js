import { ActionTypes as types } from '../helpers/constants'
import axios from 'axios'

export const subscribeToKeyword = (keywordIds, keywords) => {
  return {
    type: types.SUBSCRIBE_TO_KEYWORD,
    data: {
      keywordIds: keywordIds,
      keywords: keywords
    }
  }
}

export const keywordInputChange = (keywordInput) => {
  return {
    type: types.KEYWORD_INPUT_CHANGE,
    data: {keywordInput: keywordInput}
  }
}

export const initializeKeywords = (keywordIds, keywords, selectedKeywordId) => {
  return {
    type: types.INITIALIZE_KEYWORDS,
    data: {
      keywordIds: keywordIds,
      keywords: keywords,
      selectedKeywordId: selectedKeywordId
    }
  }
}

export const refreshedTweets = (selectedKeywordId) => {
  return (dispatch) => {
    getTweetsAjaxCall(selectedKeywordId, dispatch)
  }
}

export const changeSelectedKeywordId = (selectedKeywordId) => {
  return (dispatch) => {
    getTweetsAjaxCall(selectedKeywordId.data[0].id, dispatch)
  }
}

export const fetchTweets = (keywordId) => {
  return (dispatch) => {
    getTweetsAjaxCall(keywordId, dispatch)
  }
}

const getTweetsAjaxCall = (keywordId, dispatch) => {
  dispatch({
    type: types.CHANGE_SELECTED_KEYWORD_ID,
    data: {selectedKeywordId: keywordId}
  })

  axios.get(`/tweets/${keywordId}`)
    .then((tweetsArray) => {
      let tweetData = tweetsArray.data
      console.log('tweetData actions cheK', tweetData)
      let filteredTweetData = tweetData.filter(tweetObj => tweetObj.sentiment !== 0)
      console.log('filteredTweetData actions cheK', filteredTweetData)

      dispatch({
        type: types.SHOW_TWEETS_FOR_KEYWORD_ID,
        data: {tweets: filteredTweetData}
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateTweetSentiments = (sentiments) => {
  return {
    type: types.UPDATE_SENTIMENTS,
    data: {sentiments: sentiments}
  }
}
