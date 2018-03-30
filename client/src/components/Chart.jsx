import React from 'react'
import { connect } from 'react-redux'
import AxisX from './AxisX.jsx'
import AxisY from './AxisY.jsx'
import Line from './Line.jsx'

class Chart extends React.Component {
  render () {
    if (this.props.update) {
      console.log('Chart component TOP CHEK', this.props.update)
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
      console.log('Chart component BOTTOM CHEK', this.props.sentiments)
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
    sentiments: [{date: -5, close: 0}, {date: -10, close: 0}, {date: -15, close: 0}, {date: -20, close: 0}, {date: -25, close: 0}, {date: -30, close: 0}, {date: -35, close: 0}, {date: -40, close: 0}, {date: -45, close: 0}, {date: -50, close: 0}, {date: -55, close: 0}, {date: -60, close: 0}],
    update: state.d3.update,
    margin: state.d3.margin
  }
})(Chart)
