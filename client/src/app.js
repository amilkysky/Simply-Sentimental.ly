import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../js/stores/configureStore'
import Sentimentally from './components/Sentimentally.jsx'

class MainComponent extends React.Component {
  render () {
    return (
      <div>
        <Sentimentally />
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('root'))