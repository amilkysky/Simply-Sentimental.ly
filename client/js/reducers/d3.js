import { ActionTypes as types } from '../helpers/constants'

const defaultState = {
  chartWidth: 800,
  chartHeight: 400,
  sentiments: null,
  margin: {top: 20, right: 20, bottom: 30, left: 50},
  update: null
}

const d3 = (state = defaultState, action) => {
  switch (action.type) {
    case (types.UPDATE_SENTIMENTS):
      return {
        ...state,
        update: action.data.sentiments
      }
    default:
      return state
  }
}

export default d3
