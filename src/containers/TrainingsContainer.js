import React, { PureComponent } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import Training from './Training.js'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import googleMaps from '../img/googleMaps.png'
import fetchTrainings from '../actions/training/fetch'
import { connect } from 'react-redux'

const styles = {
root: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
},
gridList: {
  width: 500,
  height: 450,
  overflowY: 'auto',
},
};
// const trainingsData =
// [
//   {
//     id: "abc1",
//     userId: "",
//     startDate: "011217",
//     startTime: "130623,20",
//     duration:"",
//     boats: "['Jesse','Kyriakos','Veranika','Json']",
//     img: {googleMaps}
//   },
//   {
//     id: "abc2",
//     userId: "",
//     startDate: "031217",
//     startTime: "160821,04",
//     duration:"",
//     boats: "['x','y','z']",
//     img: {googleMaps}
//
//   },
//   {
//     id: "abc3",
//     userId: "",
//     startDate: "181217",
//     startTime: "090145,12",
//     duration:"",
//     boats: "['boat1','boat2','boat3','boat4']",
//     img: { googleMaps }
//   },
// ]

export class TrainingsContainer extends PureComponent {
  componentWillMount()
    { this.props.fetchTrainings() }
  render() {
    return (

        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            <Subheader>Training</Subheader>
            {trainings.map((training) =>
              <GridTile
                key={training.id}
                title={training.startDate}
                subtitle={<span>by <b>{training.startTime}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={training.img} />
              </GridTile>
            )}
          </GridList>
        </div>
      )
    }
}
const mapStateToProps = ({ trainings }) => ({ trainings})
const mapDispatchToProps = { fetchTrainings }

export default connect(mapStateToProps, mapDispatchToProps)(TrainingsContainer)
