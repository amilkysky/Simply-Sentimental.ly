import React from 'react'
import * as d3 from 'd3'

class AxisX extends React.Component {
  render () {
    const data = this.props.sentiments
    const margin = this.props.margin
    const height = this.props.height - margin.top - margin.bottom
    const width = this.props.width - margin.left - margin.right

    const x = d3.scale.linear()
      .range([0, width])

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')

    x.domain(d3.extent(data, (d) => { return d.date }))

    d3.select('.x').attr('transform', 'translate(0,' + height + ')').call(xAxis)

    return (
      <g className='x axis'></g>
    )
  }
}

export default AxisX
