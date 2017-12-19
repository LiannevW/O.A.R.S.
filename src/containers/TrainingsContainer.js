import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Training from './Training.js'
import {fetchTrainings} from '../actions/training/fetch'

export class TrainingsContainer extends PureComponent {

  componentWillMount() {
     this.props.fetchTrainings()
   }

   renderTraining = (training, index) => {
      return <Training
        key={index} { ...training } />
    }

  render() {
    const { trainings } = this.props

    return (
        <main>
          {trainings.map(this.renderTraining)}
        </main>

      )
    }
}

const mapStateToProps = ({ trainings }) => ({ trainings })

export default connect(mapStateToProps, {fetchTrainings, push})(TrainingsContainer)
