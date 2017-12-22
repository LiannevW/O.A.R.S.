import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
import './BoatPage.css'
import PropTypes from 'prop-types'
import SelectRowers from '../components/selectRower'
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
//import Search from '../components/searchRower'
class BoatPage extends PureComponent {
  static propTypes = {
  startdate: PropTypes.date,
  starttime: PropTypes.time,
  duration: PropTypes.time,
  boat_1_name:PropTypes.string,
  boat_2_name:PropTypes.string,
  boat_3_name:PropTypes.string,
  boat_4_name:PropTypes.string,
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
    const options = {rowers}
    const filterOptions = createFilterOptions({ options });
    const field = ({ options }) => (
    <Select
        name="university"
        value="one"
        options={options}
        filterOptions={filterOptions}
        onChange={val => console.log(val)}
    />)

    return (
      <div>
          <div className='training-info'>
             <h1> {training.startdate } </h1>
            <span>  <h2> {training.starttime} </h2>
                  <h2> {training.duration} </h2> </span>
            </div>
            <div className='rower-info'>
            {rowers.map((rower) =>
               <h1> {rower.firstname } {rower.lastname } </h1>

            )}
              </div>
              <div className='ship-info'>
              {ships.map((ship) =>
                 <h1> {ship.name } {ship.type } </h1>

              )}
              </div>
              <div>
              <field />
              </div>

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
