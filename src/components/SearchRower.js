import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import {createRowersAndShip} from '../actions/rowers/create'

class SearchRowerandShip extends React.Component {


constructor(props) {
  super(props);
  this.state = {
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    valueShip: 0
  };
}

saveRowersandShip() {
  console.table(this.state)

const rowers = [
  this.props.rowers[this.state.value1].id,
  this.props.rowers[this.state.value2].id,
  this.props.rowers[this.state.value3].id,
  this.props.rowers[this.state.value4].id,
];

const ships = {
  shipId: this.props.ships[this.state.valueShip].id
  }

console.table(rowers)
  console.log(this.props.rowers[this.state.value1])
  console.log(this.props.rowers[this.state.value2])
  console.log(this.props.rowers[this.state.value3])
  console.log(this.props.rowers[this.state.value4])
  this.props.save(rowers, ships.shipId, this.props.trainingId, this.props.boat_number_name)
}

  handleChange1 = (event, index, value) => this.setState({value1: value});
  handleChange2 = (event, index, value) => this.setState({value2: value});
  handleChange3 = (event, index, value) => this.setState({value3: value});
  handleChange4 = (event, index, value) => this.setState({value4: value});
  handleChange5 = (event, index, value) => this.setState({valueShip: value});


renderRower(rower, index ) {
  return (
    <MenuItem key={index} value={index} primaryText={`${rower.firstname} ${rower.lastname}`}/>
  )
}
renderShip(ship, index ) {
  return (
    <MenuItem key={index} value={index} primaryText={`${ship.name} ${ship.type}`}/>
  )
}
render() {
  const {rowers} = this.props
  const {ships} = this.props
  return (
    <div>
    <DropDownMenu value={this.state.value1} onChange={this.handleChange1}>
    {rowers.map(this.renderRower)}
    </DropDownMenu>
    <DropDownMenu maxHeight={300} value={this.state.value2} onChange={this.handleChange2}>
    {rowers.map(this.renderRower)}
    </DropDownMenu>
    <DropDownMenu maxHeight={300} value={this.state.value3} onChange={this.handleChange3}>
    {rowers.map(this.renderRower)}
    </DropDownMenu>
    <DropDownMenu maxHeight={300} value={this.state.value4} onChange={this.handleChange4}>
    {rowers.map(this.renderRower)}
    </DropDownMenu>
    <DropDownMenu value={this.state.valueShip} onChange={this.handleChange5}>
    {ships.map(this.renderShip)}
    </DropDownMenu>
    <div className="actions">
    <button className="primary buttonSave" onClick={this.saveRowersandShip.bind(this)}>Save</button>
    </div>
    </div>
    );
  }
}

const mapStateToProps = ({ rowers, ships }) => ({ rowers, ships })

const mapDispatchToProps = { save: createRowersAndShip }

export default connect(mapStateToProps, mapDispatchToProps)(SearchRowerandShip)
