import { combineReducers } from 'redux'
import keywordSubscription from './keywordSubscription'
import tweets from './tweets'
import d3 from './d3'

export default combineReducers({
  keywordSubscription: keywordSubscription,
  tweets: tweets,
  d3: d3
})
