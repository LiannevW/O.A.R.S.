import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
import './BoatPage.css'
class BoatPage extends PureComponent {
  componentWillMount() {

    const { trainingId } = this.props.match.params
      { this.props.fetchOneTraining(trainingId) }

}
  render() {
    const { training } = this.props

    return (
          <div className='training-info'>
             <h1> {training.startdate } </h1>
            <span>  <h2> {training.starttime} </h2>
                  <h2> {training.duration} </h2> </span>
            </div>
    )
  }
}

const mapStateToProps = ({ trainings }, { match }) => {
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0]

return {
  training
  }
}

export default connect(mapStateToProps, { fetchOneTraining, push }) (BoatPage)
