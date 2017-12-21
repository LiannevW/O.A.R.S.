import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
import PropTypes from 'prop-types'
import './BoatPage.css'

const trainingShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  st: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
  currentColor: PropTypes.string,

})
const rowerShape = PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.string,
      remark: PropTypes.string,
})

const shipShape = PropTypes.shape()

class BoatPage extends PureComponent {
  static propTypes = {
      fetchOneTraining: PropTypes.func.isRequired,
      Boat: PropTypes.shape({
        training: PropTypes.arrayOf(trainingShape),
        rower: PropTypes.arrayOf(rowerShape),
        ship: PropTypes.arrayOf(shipShape),
        startdate: PropTypes.string.isRequired,
        starttime: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
      })
    }
  componentWillMount() {
    const { trainingId } = this.props.match.params
      this.props.fetchOneTraining(trainingId)
      this.props.fetchRowers()
      this.props.fetchShips()

}
  render() {
    const { training, ships, rowers } = this.props

    return (
        <div>
          <div className='training-info'>
             <h1> {training.startdate } </h1>
            <span>  <h2> {training.starttime} </h2>
                  <h2> {training.duration} </h2> </span>
            </div>
            <div>
            {ships.map((ship) =>
              <p>{ship.name}</p>
            )}
            </div>
          </div>
    )
  }
}

const mapStateToProps = ({ trainings, rowers, ships }, { match }) => {
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0]

return {
  training

  }
}

export default connect(mapStateToProps, { fetchOneTraining, fetchRowers, fetchShips, push }) (BoatPage)
