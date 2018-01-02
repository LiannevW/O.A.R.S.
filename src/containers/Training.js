import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
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
        number: 1
      },
      {
        boatName: training.boat_2_name,
        number: 2
      },
      {
        boatName: training.boat_3_name,
        number: 3

      },
      {
        boatName: training.boat_4_name,
        number: 4
      },
    ]

    const listItems = boatData.map((boat) => (
        <li>
          <button>
            <span className="boat" onClick= {this.linkToBoat(training.id, boat.number)}></span>
          </button>
        </li>
    ))

    return (
      <div className= "training-info">
        <div>
          <Card style={{height:'400px', width: '600px', marginLeft: '500px'}}>
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
        </div>


        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {boatData.map((boat) => (
              <GridTile
                key={boat.number}
                title={boat.boatName}
                subtitle={boat.number}
                actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                titleStyle={styles.titleStyle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.1) 10%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0.10) 100%)"
                onClick= {this.linkToBoat(training.id, boat.number)} >
              </GridTile>
            ))}
          </GridList>

        </div>

        <TrainingsPageChartsLayer />

      </div>
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
