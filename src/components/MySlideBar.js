import React, { Component } from 'react';
import InputRange from 'react-input-range';


class MySideBar extends Component {
  constructor(props) {
  super(props);

  this.state = {
     value : 3,
   }
}

sliderHandler(value){
  this.setState({ value})
}

  render(){
    return(
      <InputRange
        maxValue={100}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })}
        onChangeComplete={val => this.sliderHandler(val)} />
    )
  }
}

export default MySideBar
