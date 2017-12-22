import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import {createRowers} from '../actions/rowers/create'

import RaisedButton from 'material-ui/RaisedButton';


class SearchRower extends React.Component {


constructor(props) {
  super(props);
  this.state = {
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0
  };
}

saveRowers() {
  console.table(this.state)

const rowers = {
  rower1Id: this.props.rowers[this.state.value1].id,
  rower2Id: this.props.rowers[this.state.value2].id,
  rower3Id: this.props.rowers[this.state.value3].id,
  rower4Id: this.props.rowers[this.state.value4].id
}

//console.table(rowers)
  console.log(this.props.rowers[this.state.value1])
  console.log(this.props.rowers[this.state.value2])
  console.log(this.props.rowers[this.state.value3])
  console.log(this.props.rowers[this.state.value4])
  this.props.save(rowers, this.props.trainingId)
}

  handleChange1 = (event, index, value) => this.setState({value1: value});
  handleChange2 = (event, index, value) => this.setState({value2: value});
  handleChange3 = (event, index, value) => this.setState({value3: value});
  handleChange4 = (event, index, value) => this.setState({value4: value});


renderRower(rower, index ) {
  return (
    <MenuItem key={index} value={index} primaryText={`${rower.firstname} ${rower.lastname}`}/>
  )
}
render() {
  const {rowers} = this.props
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
    <div className="actions">
    <button className="primary buttonSave" onClick={this.saveRowers.bind(this)}>Save</button>
    </div>
    </div>
    );
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })


const mapDispatchToProps = { save: createRowers }

export default connect(mapStateToProps, mapDispatchToProps)(SearchRower)
