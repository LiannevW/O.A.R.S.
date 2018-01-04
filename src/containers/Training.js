import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import rowboatIcon from '../img/Rowboat_symbol.svg'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import TrainingsPageChartsLayer from '../components/TrainingsPageChartsLayer'
import './Training.css'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class Training extends PureComponent {
  static propTypes = {
      fetchOneTraining: PropTypes.func.isRequired,
      Training: PropTypes.shape({
        boat_number_name: PropTypes.array,
        startdate: PropTypes.string.isRequired,
        starttime: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
      })
    }

  componentWillMount() {
    const { trainingId } = this.props.match.params
    this.props.fetchOneTraining(trainingId)
  }

  linkToBoat = ( trainingId, boatNumber ) => event => this.props.push(`/boats-path/${trainingId}/${boatNumber}`)

  render() {
    const { training } = this.props
    if (!training) return null

    // assing names and number to boat
    const boatData = [
      {
        boatName: training.boat_1_name,
        number: 1,
        color: 'red'
      },
      {
        boatName: training.boat_2_name,
        number: 2,
        color: 'blue'
      },
      {
        boatName: training.boat_3_name,
        number: 3,
        color: 'green'
      },
      {
        boatName: training.boat_4_name,
        number: 4,
        color: 'yellow'
      },
    ]

    const listItems = boatData.map((boat) => (
        <li>
          <button style={{backgroundColor:`${boat.color}`}}>
            <span className="boat" onClick= {this.linkToBoat(training.id, boat.number)}></span>
          </button>
        </li>
    ))

    return (
      <body>
      <div>

          <Card style={{height:'400px', width: '600px', margin: 'auto', marginTop: 120}}>
            <CardHeader
              title={` Training of ${training.startdate} `}
              titleStyle={{textAlign: "center",
                           marginBottom:"20px",
                           marginLeft:"80px",
                           fontSize:"25px"}}
              titleColor= "steelblue"
              subtitle=  {`Start time ${training.starttime}  | Training duraton: ${training.duration} `}
              subtitleStyle={{textAlign: "center",
                              marginBottom:"20px",
                              marginLeft:"100px",
                              fontSize:"18px"}}
            />
            <CardActions
              style={{width:'800px', marginLeft: '150px'}}>
              <span>
                <ol className="horizontal">
                  {listItems}
                </ol>
              </span>
           </CardActions>
          </Card>
    
        <TrainingsPageChartsLayer />
        </div>
    </body>
    )
  }
}

//filter training from trainers
const mapStateToProps = ({ trainings }, { match }) => {
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0]

return {
  training
  }
}

export default connect(mapStateToProps, { fetchOneTraining, push }) (Training)
