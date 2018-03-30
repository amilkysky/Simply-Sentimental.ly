import tweets from '../../js/reducers/tweets'
import keywordSubscription from '../../js/reducers/keywordSubscription'
import { ActionTypes as types } from '../../js/helpers/constants'

describe('reducers', () => {

  describe('tweets reducer', () => {
    it('should return the default state', () => {
      expect(tweets(undefined, {})).toEqual(
        {
          tweets: [],
          selectedKeywordId: 1,
          keywordIds: [],
          keywords: []
        }
      )
    })
  })

  describe('keywordSubscription reducer', () => {
    it('should return the default state', () => {
      expect(keywordSubscription(undefined, {})).toEqual(
        {
          profileId: 1,
          keywordInput: ''
        }
      )
    })
  })

})
