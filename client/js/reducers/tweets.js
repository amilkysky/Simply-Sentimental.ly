import { ActionTypes as types } from '../helpers/constants'

const defaultState = {
  tweets: [],
  selectedKeywordId: 1,
  keywordIds: [],
  keywords: []
}

const tweets = (state = defaultState, action) => {
  switch (action.type) {
    case (types.SUBSCRIBE_TO_KEYWORD):
      return {
        ...state,
        keywordIds: action.data.keywordIds,
        keywords: action.data.keywords
      }
    case (types.INITIALIZE_KEYWORDS):
      return {
        ...state,
        keywordIds: action.data.keywordIds,
        keywords: action.data.keywords,
        selectedKeywordId: action.data.selectedKeywordId
      }
    case (types.SHOW_TWEETS_FOR_KEYWORD_ID):
      return {
        ...state,
        tweets: action.data.tweets
      }
    case (types.CHANGE_SELECTED_KEYWORD_ID):
      return {
        ...state,
        selectedKeywordId: action.data.selectedKeywordId
      }
    default:
      return state
  }
}

export default tweets
