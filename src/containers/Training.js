import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import steelblue from '../img/steelblue.jpg'
import './Training.css'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


// import { Link } from 'react-router-dom'

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
    //link to Boatpage
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
console.log(boatData)
  return (

    <div className= "training-info">
        <div>
        <Card>
          <CardHeader
            title=  {`StartDate: ${training.startdate}`}
            subtitle=  {`starttime ${training.starttime}     duraton: ${training.duration} `}
          />
          <CardText >
          <p> Select Rowers and Ship for this training </p>

          </CardText>
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
              <img src={steelblue } alt=""/>
            </GridTile>
          ))}
        </GridList>
        </div>
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
