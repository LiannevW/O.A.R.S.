import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ships/fetch'
import ShipsEditor from './ShipsEditor'
import './ShipsContainer.css'
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import { Card, CardHeader } from 'material-ui/Card'
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import shipIcon from '../img/ship.svg'


class ShipsContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchShips()
  }


  linktToOneShip = shipId => event => this.props.push(`/ships-path/${shipId}`);

  render() {
    return (
    <div>
      <Card className='addship' style={{width: 1200, height:100, margin: 'auto', marginTop: 120}}>
      <ShipsEditor />
      </Card>

      <Card style={{width: 1200, margin: 'auto', marginTop: 50}} >
          <List style={{margin: 'auto', align: 'center'}}>
          <Subheader style={{color:'steelblue', fontSize:20}}
          inset={true}>Ships</Subheader>
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
                  leftAvatar={
                     <Avatar src={shipIcon} size={40}  />}
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
