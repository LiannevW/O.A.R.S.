import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ShipsContainer extends PureComponent {
  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default ShipsContainer
