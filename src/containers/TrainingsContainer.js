import React, { PureComponent } from 'react'
import Training from './Training'

export class TrainingsContainer extends PureComponent {

  renderTraining(training, index) {
    return (
      <Training key={index} {...training} />
    )
  }

  render() {
    const { trainings } = this.props

    return (
      <h1>{trainings.map(this.renderTraining)}</h1>
    )
  }
}


export default TrainingsContainer
