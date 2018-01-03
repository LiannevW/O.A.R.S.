import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ships/fetch'
import ShipsEditor from './ShipsEditor'
import './ShipsContainer.css'
import List from 'material-ui/List/List';


class ShipsContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchShips()
  }

  linktToOneShip = shipId => event => this.props.push(`/ships-path/${shipId}`);

  render() {
    return (
      <div>
      <div className = "List pointer">
      <List style={{  width: '60%', marginTop: '300x'  }}>
        {this.props.ships.sort(function(a, b){
          if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1
          } else {
            return 0
          }
        }).map((ship) => (
          <p onClick={this.linktToOneShip(ship.id)}>{ship.name} {ship.type}</p>
        ))}
        </List>
      </div>
      <div className = "editor">
        <ShipsEditor/>
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ships }) => ({ ships })
export default connect (mapStateToProps, {fetchShips, push}) (ShipsContainer)
