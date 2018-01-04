import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rowers/fetch'
import RowersEditor from './RowersEditor'
import avatar from '../img/avatar.png'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
<<<<<<< HEAD
=======
import Subheader from 'material-ui/Subheader';
>>>>>>> 40c8f39ef8ac0836824bc88c0d64c79383156f93
import { Card, CardHeader } from 'material-ui/Card'
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
<<<<<<< HEAD
      <Card>
        <CardHeader>
        <div className = 'editor'>
          <RowersEditor />
        </div>
        </CardHeader>
      </Card>
      <Card>
        <div className = 'List'>
          <List>
            {this.state.filteredRowers.sort(function(a, b){
=======
      <Card className='addrower' style={{width: 1200, height:100, margin: 'auto', marginTop: 120,}}>

      <RowersEditor />

      </Card>

      <Card style={{width: 1200, margin: 'auto', marginTop: 50}} >

          <List style={{margin: 'auto', align: 'center'}}>
          <Subheader style={{color:'steelblue', fontSize:20}}
          inset={true}>Rowers</Subheader>
            {this.props.rowers.sort(function(a, b){
>>>>>>> 40c8f39ef8ac0836824bc88c0d64c79383156f93
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
<<<<<<< HEAD
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
        </div>
      </Card>
=======
      </Card >
>>>>>>> 40c8f39ef8ac0836824bc88c0d64c79383156f93
    </div>
    )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
