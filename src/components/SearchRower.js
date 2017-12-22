import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'

const styles = {
  customWidth: {
    width: 200,
  },
  position: 'fixed',
}

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

   handleChange1 = (event, index, value) => this.setState({value1: value});
   handleChange2 = (event, index, value) => this.setState({value2: value});
   handleChange3 = (event, index, value) => this.setState({value3: value});
   handleChange4 = (event, index, value) => this.setState({value4: value});

   // renderRower(rower, index ) {
   //   return (
   // <MenuItem key={index} value={index} primaryText={`${rower.firstname} ${rower.lastname}`}/>
   //   )
   // }
  render() {
    const {rowers} = this.props
    return (
      <div>
      <DropDownMenu value={this.state.value1} onChange={this.handleChange1} style={styles.customWidth} openOnFocus = {true} anchorOrigin>
        {rowers.map((rower) => (
        <MenuItem key={rowers} value={rowers} primaryText={`${rower.firstname} ${rower.lastname}`}/> ))}
      </DropDownMenu>
      <DropDownMenu maxHeight={300} value={this.state.value2} onChange={this.handleChange2} style={styles.customWidth}>
        {rowers.map((rower) => (
          <MenuItem key={rower} value={rower} primaryText={`${rower.firstname} ${rower.lastname}`}/> ))}
      </DropDownMenu>
      <DropDownMenu maxHeight={300} value={this.state.value3} onChange={this.handleChange3} style={styles.customWidth}>
        {rowers.map((rower) => (
          <MenuItem key={rowers} value={rowers} primaryText={`${rower.firstname} ${rower.lastname}`}/> ))}
      </DropDownMenu>
      <DropDownMenu maxHeight={300} value={this.state.value4} onChange={this.handleChange4} style={styles.customWidth}>
        {rowers.map((rower) => (
          <MenuItem key={rowers} value={rowers} primaryText={`${rower.firstname} ${rower.lastname}`}/> ))}
      </DropDownMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })

export default connect(mapStateToProps)(SearchRower)
