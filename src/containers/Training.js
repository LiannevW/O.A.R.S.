import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Training extends PureComponent {
  static propTypes = {
        startDate: PropTypes.string,
        startTime: PropTypes.date,
        duration: PropTypes.number,
        boats: PropTypes.array

  }

  render() {
    const { startDate } = this.props

    return (
      <h1>{ startDate }</h1>

    )
  }
}

export default Training
