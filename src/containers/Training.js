import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/training/fetch'
// import { Link } from 'react-router-dom'


class Training extends PureComponent {
  static propTypes = {
      fetchOneTraining: PropTypes.func.isRequired,
      Training: PropTypes.shape({
        boat: PropTypes.array,
        startdate: PropTypes.string.isRequired,
        starttime: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,

        })
    }

  componentWillMount() {
     const { trainingId } = this.props.match.params

     const { training, fetchOneTraining } = this.props
      { this.props.fetchOneTraining(trainingId) }
}

  render() {
    console.log('props', this.props)

    const {training} = this.props
    if (!training) return null
    console.log(training)
  return (

      <h1> {training.startdate} </h1>
       <p> {training.starttime} </p>
       <p> {training.duration} </p>

    )
  }
}
const mapStateToProps = ({ trainings }, { match }) => {
  const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0]

  return {
    training
  }
}


export default connect(mapStateToProps, { fetchOneTraining, push  })(Training)
