import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ships/fetch'
import ShipsEditor from './ShipsEditor'


class ShipsContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchShips()
  }

linktToOneShip = shipId => event => this.props.push(`/ships-path/${shipId}`);

  render() {
    console.log(this.props.ships)

    return (
      <div className= "editor">
      <header>
        <ShipsEditor/>
      </header>
      <main>
        {this.props.ships.map((ship) =>
          <p onClick={this.linktToOneShip(ship.id)}>{ship.name}</p>
        )}
      </main>
      </div>
    )
  }
}

const mapStateToProps = ({ ships }) => ({ ships })
export default connect (mapStateToProps, {fetchShips, push}) (ShipsContainer)
