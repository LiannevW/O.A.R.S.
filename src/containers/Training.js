import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/training/fetch'
// import { Link } from 'react-router-dom'

class Training extends PureComponent {
  static propTypes = {
        startdate: PropTypes.string,
        starttime: PropTypes.number,
        duration: PropTypes.number,
  }

  componentWillMount() {
     const { trainingId } = this.props.match.params
      { this.props.fetchOneTraining(trainingId) }
}


  render() {

    const { training } = this.props

    return (
<p> hallo </p>

      // <div>
      // <p> {training.id}  </p>
      // <p> {training.startdate} </p>
      // <p> {training.starttime} </p>
      // <p> {training.duration} </p>
      // </div>
    )
  }
}
const mapStateToProps = ({ trainings }, { match }) => {
const training = trainings.filter((t) => (t.id === match.params.training.id))[0]
return {
  training
}
}

export default connect(mapStateToProps, { fetchOneTraining, push  })(Training)
