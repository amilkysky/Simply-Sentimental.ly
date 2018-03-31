import React from 'react'
import { connect } from 'react-redux'
import AxisX from './AxisX.jsx'
import AxisY from './AxisY.jsx'
import Line from './Line.jsx'

class Chart extends React.Component {
  render () {
    if (this.props.update) {
      return (
        <div>
          <div id="chart">
            <svg height={this.props.chartHeight} width={this.props.chartWidth} >
              <g transform="translate(50,20)">
                <AxisX width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.update}/>
                <AxisY width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.update}/>
                <Line width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.update}/>
              </g>
            </svg>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id="chart">
            <svg height={this.props.chartHeight} width={this.props.chartWidth} >
              <g transform="translate(50,20)">
                <AxisX width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.sentiments}/>
                <AxisY width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.sentiments}/>
                <Line width={this.props.chartWidth} height={this.props.chartHeight} margin={this.props.margin} sentiments={this.props.sentiments}/>
              </g>
            </svg>
          </div>
        </div>
      )
    }
  }
}

export default connect((state, props) => {
  return {
    chartWidth: state.d3.chartWidth,
    chartHeight: state.d3.chartHeight,
    sentiments: [{date: -1, close: 0}, {date: -2, close: 0}, {date: -3, close: 0}, {date: -4, close: 0}, {date: -5, close: 0}, {date: -6, close: 0}, {date: -7, close: 0}, {date: -8, close: 0}, {date: -9, close: 0}, {date: -10, close: 0}, {date: -11, close: 0}, {date: -12, close: 0}],
    update: state.d3.update,
    margin: state.d3.margin
  }
})(Chart)
