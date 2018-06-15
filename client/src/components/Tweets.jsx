import React from 'react'
import TweetEntry from './TweetEntry.jsx'
import shortid from 'shortid'

class Tweets extends React.Component {
  render () {

    return (
      <div className="tweetsContainer">
        <ul>
          {this.props.tweetsArray.map((tweet) => {
            return <li key={shortid.generate()}><TweetEntry tweetEntry={tweet} /></li>
          })}
        </ul>
      </div>
    )
  }
}

export default Tweets
