import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import {createRowersAndShip} from '../actions/rowers/create'
import {fetchboatRowers} from '../actions/rowers/fetch'
import SnackbarSave from './SnackbarSave'

class SearchRowerandShip extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    selectedRowers: [],
    selectedShipValue: 0
  };
}

//getting selected rowers, making request
componentWillMount() {
  const { trainingId, boat_number_name } = this.props
    this.props.fetchSelectedRowers (trainingId, boat_number_name)
}

//to show saved rowers and ship
//boatRowers - rowers and ship that belong to this boat
componentWillReceiveProps(nextProps) { //is invoked before the component receives new props
  if (this.props.boatRowers !== nextProps.boatRowers) { //if we have changes
    const newSelectedRowers = [];
    //console.log(nextProps.boatRowers.rowers);
    //console.log(nextProps.rowers);
    nextProps.boatRowers.rowers.forEach(boatRower => {
      var newrower = nextProps.rowers.find(rower => rower.id === boatRower.Id);
      if (newrower !== undefined) {
        newSelectedRowers.push(newrower);
      }
    });
    this.setState({ //perform state transitions
      selectedRowers: newSelectedRowers
    });
    nextProps.boatRowers.ships.forEach(boatShip => {
      var newship = nextProps.ships.find(ship => ship.id === boatShip.Id);
      if (newship !== undefined) {
        this.setState({
          selectedShipValue: nextProps.ships.indexOf(newship)
        });
      }
    });
  }
}

saveRowersandShip() {

//console.table(this.state)

const rowers = this.state.selectedRowers.map(rower => rower.id);

const shipId = this.props.ships[this.state.selectedShipValue].id

console.table(rowers)
  console.log(this.props.rowers[this.state.value1])
  console.log(this.props.rowers[this.state.value2])
  console.log(this.props.rowers[this.state.value3])
  console.log(this.props.rowers[this.state.value4])
  this.props.save(rowers, ships.shipId, this.props.trainingId, this.props.boat_number_name)

}

handleRowerChange = (event, index, value) => {
  var newRower = this.props.rowers[value];
  var newSelectedRowers = this.state.selectedRowers.slice(); //clone of selectedRowers
  newSelectedRowers.push(newRower)

  this.setState({
    selectedRowers: newSelectedRowers
  });
}

handleShipChange = (event, index, value) => {
  this.setState({
    selectedShipValue: value
  });
}

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
  const {rowers, ships} = this.props

  return (
    <div>
    <DropDownMenu value={0} onChange={this.handleRowerChange}>
    {rowers.map(this.renderRower)}
    </DropDownMenu>
    <div> {
    this.state.selectedRowers.map((selectedRower, index) => {
      //console.log(this.state.selectedRowers)
      return (
        <div key={index}>
        {
          selectedRower.firstname
        }&nbsp;
        {
          selectedRower.lastname
        }
    </div>
      );
    })
  }
  </div>
    <DropDownMenu value={this.state.selectedShipValue} onChange={this.handleShipChange}>
    {ships.map(this.renderShip)}
    </DropDownMenu>
    <div className = 'snackbar'>
     <SnackbarSave handleSave={this.saveRowersandShip.bind(this)} />
    </div>
    </div>
    );
  }
}

const mapStateToProps = ({ rowers, ships, boatRowers }) => ({ rowers, ships, boatRowers })

const mapDispatchToProps = { save : createRowersAndShip, fetchSelectedRowers: fetchboatRowers }

export default connect(mapStateToProps, mapDispatchToProps)(SearchRowerandShip)
