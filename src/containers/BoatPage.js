import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class BoatPage extends PureComponent {
  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default BoatPage
