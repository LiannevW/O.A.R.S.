import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rowers/fetch'
import RowersEditor from './RowersEditor'
import avatar from '../img/avatar.png'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { Card, CardText, CardMedia } from 'material-ui/Card'
import './RowersContainer.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class RowersContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      filteredRowers: [],
      searchInput: ''
    };
  }

  componentWillMount() {
    this.props.fetchRowers()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredRowers: nextProps.rowers
    })
  }

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
   };
  searchOneRower() {
    const filteredRowersForSeatch = this.props.rowers.filter(rower => rower.firstname.toUpperCase() === this.state.searchInput.toUpperCase());
    this.setState({
      filteredRowers: filteredRowersForSeatch
    })
  }
  reset() {
    this.setState({
      filteredRowers: this.props.rowers
    })
  }
  render() {

  return (
    <div>
      <Card className='addrower' style={{width: 1200, height:160, margin: 'auto', marginTop: 120,}}>
        <CardText style= {{flex:1, margin: 'auto', textAlign: 'center', marginTop: -80, color:'steelblue'}}>
        <h2> Rowers </h2>
        </CardText>
       <CardMedia mediaStyle= {{margin:'auto', marginTop: -80, marginLeft: -50}}>
        <RowersEditor />
       </CardMedia>
      </Card>

      <Card style={{width: 1200, margin: 'auto', marginTop: 50}} >
      <TextField
        value={this.state.searchInput}
        onChange={this.handleChange}
      />
      <div className="actions">
        <RaisedButton
        onClick={this.searchOneRower.bind(this)}
        label="Search a rower"
        />
        <RaisedButton
        onClick={this.reset.bind(this)}
        label="Reset"
        />
      </div>
          <List style={{margin: 'auto', align: 'center'}}>
            {this.state.filteredRowers.sort(function(a, b){
              if (a.firstname < b.firstname) {
                return -1
              } else if (a.firstname > b.firstname) {
                return 1
              } else {
                return 0
              }
            }).map((rower) => (
              <ListItem key={rower.id} leftAvatar={
                 <Avatar src={avatar} size={30}  />}
                  style={{  margin: '50x', padding: '0,5rem',  }}
                  onClick={this.linkToOneRower(rower.id)}>{rower.firstname} {rower.lastname}
              </ListItem>
            ))}
          </List>

      </Card>
    </div>
    )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
