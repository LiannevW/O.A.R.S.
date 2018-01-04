import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ships/fetch'
import ShipsEditor from './ShipsEditor'
import './ShipsContainer.css'
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import { Card, CardMedia, CardText } from 'material-ui/Card'
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import mui from 'material-ui';
import DirectionsBoatIcon from 'react-material-icons/icons/maps/directions-boat'


class ShipsContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchShips()
  }


  linktToOneShip = shipId => event => this.props.push(`/ships-path/${shipId}`);

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
