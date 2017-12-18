import React, { PureComponent } from 'react'

class ShipsContainer extends PureComponent {
  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default ShipsContainer
