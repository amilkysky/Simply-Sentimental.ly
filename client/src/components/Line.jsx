import React from 'react'
import d3 from 'd3'

class Line extends React.Component {
  render () {
    // convert this to exchange rates
    const data = this.props.sentiments
    const margin = this.props.margin
    const height = this.props.height - margin.top - margin.bottom
    const width = this.props.width - margin.left - margin.right

    const x = d3.time.scale()
      .range([0, width])

    const y = d3.scale.linear()
      .range([height, 0])

    const line = d3.svg.line()
      .x((d) => { return x(d.date) })
      .y((d) => { return y(d.close) })

    data.forEach((d) => {
      x.domain(d3.extent(data, (d) => { return d.date }))
      y.domain(d3.extent(data, (d) => { return d.close }))
    })

    const newline = line(data)

    return (
      <path className="line" d={newline}></path>
    )
  }
}

export default Line
