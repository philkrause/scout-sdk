import React, { Component } from 'react'

class Stats extends Component {
  render() {
    return (
      <>
        <section className="solo-card">
          <p>{this.props.def}</p>
          <p>{this.props.totals}</p>
        </section>
      </>
    )
  }
}
export default Stats
