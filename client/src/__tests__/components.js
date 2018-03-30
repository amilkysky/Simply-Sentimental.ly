import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TweetEntry from '../components/TweetEntry.jsx'

Enzyme.configure({ adapter: new Adapter() })
 
function setupTweetEntry () {
  const props = {
    tweetEntry: {
      sentiment: '10',
      text: 'chocolate'
    }
  }
 
  const enzymeWrapper = mount(<TweetEntry {...props} />)
 
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {

  describe('TweetEntry', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setupTweetEntry()
 
      expect(enzymeWrapper.find('article').hasClass('tweetEntry')).toBe(true)
      expect(enzymeWrapper.find('.tweetEntryText').text()).toBe('chocolate')
      expect(enzymeWrapper.find('.tweetEntrySentiment').text()).toBe('10: ')
    })

  })
})
