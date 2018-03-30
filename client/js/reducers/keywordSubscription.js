import { ActionTypes as types } from '../helpers/constants'

const defaultState = {
  profileId: 1,
  keywordInput: ''
}

const keywordSubscription = (state = defaultState, action) => {
  switch (action.type) {
    case (types.KEYWORD_INPUT_CHANGE):
      return {
        ...state,
        keywordInput: action.data.keywordInput
      }
    default:
      return state
  }
}

export default keywordSubscription
