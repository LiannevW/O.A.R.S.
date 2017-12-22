import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
import './BoatPage.css'
import PropTypes from 'prop-types'
import SearchRower from '../components/SearchRower'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import BoatGraphs from '../components/graphsBoat'

class BoatPage extends PureComponent {

  static propTypes = {
  startdate: PropTypes.date,
  starttime: PropTypes.time,
  duration: PropTypes.time,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
}
  componentWillMount() {

    const { trainingId } = this.props.match.params
      this.props.fetchOneTraining(trainingId)
      this.props.fetchRowers()
      this.props.fetchShips()
}

  render() {
    const { training, rowers, ships } = this.props

    if(!training) return null;

    return (
      <div>
          <div className='training-info'>
             <h1> {training.startdate } </h1>
            <span>  <h2> {training.starttime} </h2>
                  <h2> {training.duration} </h2> </span>
            </div>
                <div className='rower-search'>
                <SearchRower />
                </div>
                  <BoatGraphs />
              </div>

    )
  }
}

const mapStateToProps = ({ trainings, rowers, ships }, { match }) => {
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0]

return {
  training, rowers, ships
  }
}

export default connect(mapStateToProps, { fetchOneTraining, fetchRowers, fetchShips, push }) (BoatPage)
