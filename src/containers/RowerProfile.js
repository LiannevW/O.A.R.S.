import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneRower } from '../actions/rowers/fetch'
import Title from '../components/Title'
import {Table,TableBody, TableHeader,  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Info from 'react-material-icons/icons/action/info'
import './RowerProfile.css'


class RowerProfile extends PureComponent {

  componentWillMount() {
    const { rowerId } = this.props.match.params
      this.props.fetchOneRower(rowerId)

  }

  renderRower = (rower, index) => {
  return (
     <TableRow key={index}>
      <TableRowColumn >{rower.TrainingId}</TableRowColumn>
      <TableRowColumn>{rower.startdate}</TableRowColumn>
      <TableRowColumn>{rower.starttime}</TableRowColumn>
      <TableRowColumn>{rower.boat_number}</TableRowColumn>
      <TableRowColumn>
        <IconButton onClick= {this.linkToTraining(rower.TrainingId, rower.boat_number)}>
          <Info />
        </IconButton>
      </TableRowColumn>
    </TableRow>
  )
}

linkToTraining = ( trainingId, boatNumber ) => event => this.props.push(`/boats-path/${trainingId}/${boatNumber}`)

render() {
  const { rower } = this.props
  const rowername = rower.filter((r) => (r))[0]

  if (!rower) return null
  if (!rowername) return null

  return (
    <article className="rowerprofile">
      <header>
        <Title content={`${rowername.firstname} ${rowername.lastname}`} className="level-2" />
      </header>
      <div className="table">
        <Table className="table-header" >

          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{fontSize:'20px',}}>
            <TableRow>
              <TableHeaderColumn>Training</TableHeaderColumn>
              <TableHeaderColumn>start Date</TableHeaderColumn>
              <TableHeaderColumn>start time</TableHeaderColumn>
              <TableHeaderColumn>boat Number</TableHeaderColumn>
              <TableHeaderColumn>Link to Training</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {rower.map(this.renderRower)}
          </TableBody>

        </Table>
      </div>
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
