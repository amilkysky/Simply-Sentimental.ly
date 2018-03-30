import * as actions from '../../js/actions/actions'
import { ActionTypes as types } from '../../js/helpers/constants'
 
describe('actions', () => {

    describe('action creators', () => {
      it('should subscribeToKeyword', () => {
        const data = {
          keywordIds: [1],
          keywords: ['Disney']
        }
        const expectedAction = {
            type: types.SUBSCRIBE_TO_KEYWORD,
            data: data
        }
        expect(actions.subscribeToKeyword(data.keywordIds, data.keywords)).toEqual(expectedAction)
      })
  })

})
