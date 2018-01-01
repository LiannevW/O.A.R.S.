import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createShip } from '../actions/ships/create'
import './ShipsEditor.css'
import SnackbarAdd from '../components/SnackbarAdd'

class ShipsEditor extends PureComponent {

  saveShip(event) {

      event.preventDefault()

      const ship = {
        name: this.refs.name.value,
        type: this.refs.type.value
      }

      const ships = this.props.ships.map(ship => ship.name);
      if (!ships.includes(ship.name)){
        this.props.save(ship)
        return true;
      }
      return false
    }

  render() {
    return (
      <div className= "editor">
        <form>
          <input
            type="name"
            ref="name"
            placeholder="name of the ship"

          />
          <input
            type="type"
            ref="type"
            placeholder="type of ship"
          />
        </form>
          <div className = 'snackbar'>
           <SnackbarAdd handleAdd={this.saveShip.bind(this)} />
          </div>
      </div>
    )
  }
}
const mapStateToProps = ({ships}) => ({ships})

const mapDispatchToProps = { save : createShip}

export default connect(mapStateToProps, mapDispatchToProps) (ShipsEditor)
