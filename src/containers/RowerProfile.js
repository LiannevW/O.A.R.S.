import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneRower } from '../actions/rowers/fetch'
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import googleMaps from '../img/googleMaps.png'
import {Table,TableBody, TableHeader,  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import './RowerProfile.css'
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

class RowerProfile extends PureComponent {

  componentWillMount() {
    const { rowerId } = this.props.match.params
      this.props.fetchOneRower(rowerId)

  }

  renderRower = (rower, index) => {
  return (
     <TableRow key={index}>
      <TableRowColumn>{rower.TrainingId}</TableRowColumn>
      <TableRowColumn>{rower.starttime}</TableRowColumn>
      <TableRowColumn>{rower.boat_number}</TableRowColumn>
    </TableRow>

  )
   console.log(rower)
}

render() {
 const { rower } = this.props

 console.log(rower)
   if (!rower) return null


  return (
      <div className= 'rowerprofile'>
          <p>{rower.lastname}</p>
          <p>{rower.firstname}</p>
          <p>{rower.TrainingId}</p>
          <p>{rower.boat_number}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ rowers }, { match }) => {
const rower = rowers.filter((t) => (t.id === +match.params.rowerId))[0]
return {
  rower
  }
}

export default connect(mapStateToProps, { fetchOneRower, push }) (RowerProfile)

// <div style={styles.root}>
//   <GridList
//     cellHeight={180}
//     style={styles.gridList}
//   >
//
//     {rower.RowerId.map((training) =>
//       <GridTile
//         key={training.id}
//         title={training.startdate}
//         subtitle={<span>Start Time: <b>{training.starttime}</b></span>}
//         actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
//         onClick= {this.linkToTraining(training.id)}
//
//       >
//         <img src={googleMaps } alt=""/>
//       </GridTile>
//     )}
//   </GridList>
// </div>
