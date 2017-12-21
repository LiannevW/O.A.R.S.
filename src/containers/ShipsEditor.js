import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createShip } from '../actions/ships'
import './ShipsEditor.css'

class ShipsEditor extends PureComponent {

  saveShip(event) {

      event.preventDefault()

      const ship = {
        name: this.refs.name.value,
        type: this.refs.type.value
      }

      this.props.save(ship)
  }

  render() {
    return (
      <div className= "editor">
        <form onSubmit={this.saveShip.bind(this)}>
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
        <div>
          <button onClick={this.saveShip.bind(this)}>Add ship</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save : createShip}
export default connect(null, mapDispatchToProps) (ShipsEditor)
