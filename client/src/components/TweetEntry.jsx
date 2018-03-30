import React from 'react'

class TweetEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <article className="tweetEntry">
        <b><span className="tweetEntrySentiment">{this.props.tweetEntry.sentiment}: </span></b>
        <span className="tweetEntryText">{this.props.tweetEntry.text}</span>
      </article>
    )
  }
}

export default TweetEntry
