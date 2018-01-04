import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ships/fetch'
import ShipsEditor from './ShipsEditor'
import './ShipsContainer.css'
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import { Card, CardText, CardMedia } from 'material-ui/Card'
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import mui from 'material-ui';
import DirectionsBoatIcon from 'react-material-icons/icons/maps/directions-boat'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class ShipsContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      filteredShips: [],
      searchInput: ''
    };
  }

  componentWillMount() {
    this.props.fetchShips()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredShips: nextProps.ships
    })
  }

  linktToOneShip = shipId => event => this.props.push(`/ships-path/${shipId}`);

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
   };
  searchOneShip() {
     const filteredShipsForSeatch = this.props.ships.filter(ship => ship.name.toUpperCase() === this.state.searchInput.toUpperCase());
     this.setState({
       filteredShips: filteredShipsForSeatch
     })
   }
   reset() {
     this.setState({
       filteredShips: this.props.ships
     })
   }
  render() {
    return (
    <div>
      <Card className='addship' style={{width: 1200, height:160, margin: 'auto', marginTop: 120}}>
      <CardText style= {{flex:1, margin: 'auto', textAlign: 'center', marginTop: -80, color:'steelblue'}}>
      <h2> Ships </h2>
      </CardText>
     <CardMedia mediaStyle= {{margin:'auto', marginTop: -80, marginLeft: -50}}>
      <ShipsEditor />
     </CardMedia>
    </Card>

      <Card style={{width: 1200, margin: 'auto', marginTop: 50}} >
      <TextField
        value={this.state.searchInput}
        onChange={this.handleChange}
      />
      <div className="actions">
        <RaisedButton
        onClick={this.searchOneShip.bind(this)}
        label="Search a ship"
        />
        <RaisedButton
        onClick={this.reset.bind(this)}
        label="Reset"
        />
      </div>
          <List style={{margin: 'auto', align: 'center'}}>

          {this.props.ships.sort(function(a, b){
            if (a.name < b.name) {
              return -1
            } else if (a.name > b.name) {
              return 1
            } else {
              return 0
            }
          }).map((ship) => (
              <ListItem
                  key={ship.name}
                  primaryText={ship.name}
                  secondaryText={ship.type}
                  leftIcon={<DirectionsBoatIcon />}
                  style={{  margin: '50x', padding: '0,5rem',}}
                  onClick={this.linktToOneShip(ship.id)}>
              </ListItem>
            ))}
          </List>
      </Card >
    </div>



    )
  }
}

const mapStateToProps = ({ ships }) => ({ ships })
export default connect (mapStateToProps, {fetchShips, push}) (ShipsContainer)
