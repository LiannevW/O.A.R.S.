import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
//import { fetchboatRowers } from '../actions/rowers/fetch'
import RowersList from '../components/RowersList'
import './BoatPage.css'
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types'
import SearchRowerandShip from '../components/SearchRower'
import Charts from '../components/charts'
import 'react-input-range/lib/css/index.css';
import '../../node_modules/react-linechart/dist/styles.css'
import './BoatPage.css'
import BoatPageChartsLayer from '../components/boatPageChartsLayer'


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
    const { training } = this.props
    if(!training) return null;

    return (

      <div>
      <RowersList />
          <div className='training-info'>
    <Card style= {{width: '900px',
                   dislplay: 'flex',
                   align: 'center',
                   marginLeft:'300px',
                   height: '400px'}}>
      <CardHeader
        title={` Training of ${training.startdate} `}
        titleStyle={{textAlign: "center",
                     marginBottom:"20px",
                     marginLeft:"80px",
                     fontSize:"25px"}}
        titleColor= "steelblue"
        subtitle=  {`| start time ${training.starttime}  | Training duraton: ${training.duration} `}
        subtitleStyle={{textAlign: "center",
                        marginBottom:"20px",
                        marginLeft:"100px",
                        fontSize:"18px"}}

      />
      <CardText>
      <p className= 'text'> Select Rowers and Ship for this boat </p>
        <SearchRowerandShip trainingId={this.props.trainingId} boat_number_name={this.props.boat_number_name} />
      </CardText>
    </Card>
    </div>
    <div className= 'drawgraphs'>
    </div>

    <div className='boatPageChartsLayer'>
      <BoatPageChartsLayer />
    </div>
  </div>
    )
  }
}

const mapStateToProps = ({ trainings, rowers, ships }, { match }) => { 
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0] 
const trainingId = match.params.trainingId
const boat_number_name = match.params.boat_number_name
const shipId = match.params.shipId
 
return { 
  training, rowers, ships, trainingId, boat_number_name, shipId
  } 
} 

export default connect(mapStateToProps, { fetchOneTraining, fetchRowers, fetchShips, push }) (BoatPage)
