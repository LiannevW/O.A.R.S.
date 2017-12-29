import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneRower } from '../actions/rowers/fetch'
import Title from '../components/Title'
import {Table,TableBody, TableHeader,  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import './RowerProfile.css'
import picture from '../img/avatar.png'

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
 const rowername = rower.filter((r) => (r))[0]
 console.log(rowername)
   if (!rower) return null

  return (
  <article className="rowerprofile">
    <header>
        <Title content={`${rowername.firstname} ${rowername.lastname}`} className="level-2" />
        <div className="color">
        </div>
        <div className="cover"
              style={{backgroundImage:`url(${ picture })`}}/>

      </header>


    <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Training</TableHeaderColumn>
              <TableHeaderColumn>startTime</TableHeaderColumn>
              <TableHeaderColumn>boat Number</TableHeaderColumn>
            </TableRow>
          </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rower.map(this.renderRower)}
                </TableBody>
            </Table>
  </article>
    )
  }
}

const mapStateToProps = ({ rowers }, { match }) => {
const rower = rowers.filter((t) => (t.id === +match.params.rowerId))
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
