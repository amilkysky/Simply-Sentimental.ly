import React from 'react'
import d3 from 'd3'

class AxisY extends React.Component {
  render () {
    const data = this.props.sentiments
    const margin = this.props.margin
    const height = this.props.height - margin.top - margin.bottom
    const width = this.props.width - margin.left - margin.right

    const y = d3.scale.linear()
      .range([height, 0])

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')

    y.domain(d3.extent(data, (d) => { return d.close }))

    d3.select('.y').call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Sentiment')
    return (
      <g className="y axis"></g>
    )
  }
}

export default AxisY
