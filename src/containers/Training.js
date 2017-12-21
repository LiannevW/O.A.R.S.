import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/training/fetch'
// import { Link } from 'react-router-dom'


class Training extends PureComponent {
  static propTypes = {
      fetchOneTraining: PropTypes.func.isRequired,
      training: PropTypes.shape({
        boat: PropTypes.array,
        startdate: PropTypes.string.isRequired,
        starttime: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
      })
    }

  componentWillMount() {

    const { trainingId } = this.props.match.params
      { this.props.fetchOneTraining(trainingId) }

}

  render() {

    const { training } = this.props

    console.log(training)
  return (


       <h1> {training.starttime } </h1>


    )
  }
}


const mapStateToProps = ({ trainings }, { match }) => {
const training = trainings.filter((t) => (t.id === match.params.trainingId))[0]

return {
  training
  }
}

export default connect(mapStateToProps, { fetchOneTraining }) (Training)
