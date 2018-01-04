import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import {fetchTrainings} from '../actions/trainings/fetch'
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import googleMaps from '../img/googleMaps.png'
import './TrainingsContainer.css'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '200px',
  },
  gridList: {
    width: 900,
    height: 450,
  },
};

export class TrainingsContainer extends PureComponent {

  componentWillMount() {
     this.props.fetchTrainings()
   }

  linkToTraining = trainingId => event => this.props.push(`/trainings/${trainingId}`)

  render() {
    const { trainings } = this.props

    return (
      <body>
        <div className='background'>
          <div style={styles.root}>
            <GridList
              cellHeight={180}
              cols = {3}
              padding = {30}
              style={styles.gridList}
            >
              {trainings.map((training) =>
                <GridTile
                  key={training.id}
                  title={new Date(training.startdate).toLocaleDateString("nl-NL")}
                  subtitle={<span>Start Time: <b>{training.starttime}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  onClick= {this.linkToTraining(training.id)}
                >
                  <img src={googleMaps } alt=""/>
                </GridTile>
              )}
            </GridList>
          </div>
        </div>
      </body>
      )
    }
}

const mapStateToProps = ({ trainings }) => ({ trainings })

export default connect(mapStateToProps, {fetchTrainings, push})(TrainingsContainer)
