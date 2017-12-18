import React, { PureComponent } from 'react'

export class TrainingsContainer extends PureComponent {

  static propTypes = {

    training: PropTypes.shape({
      boat: PropTypes.arrayOf(boatShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.date.isRequired,
      startTime: PropTypes.date.isRequired,
      duration: PropTypes.number.isRequired,

      })
  }

  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default Training
