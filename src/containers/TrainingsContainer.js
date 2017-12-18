import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

export class TrainingsContainer extends PureComponent {

  // static propTypes = {

    // training: PropTypes.shape({
    //   startDate: PropTypes.string.isRequired,
    //   endDate: PropTypes.date.isRequired,
    //   startTime: PropTypes.date.isRequired,
    //   duration: PropTypes.number.isRequired,

      // })
  // }

  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default TrainingsContainer
