import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class RowersProfile extends PureComponent {
  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default RowersProfile
