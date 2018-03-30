import React from 'react'
import TweetEntry from './TweetEntry.jsx'

class Tweets extends React.Component {
  render () {

    return (
      <div className="tweetsContainer">
        <ul>
          {this.props.tweetsArray.map((tweet, i) => {
            return <li key={i}><TweetEntry tweetEntry={tweet} /></li>
          })}
        </ul>
      </div>
    )
  }
}

export default Tweets
