import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneShip } from '../actions/ships/fetch'
// import { Link } from 'react-router-dom'


class Training extends PureComponent {


  componentWillMount() {

    const { shipId } = this.props.match.params
      { this.props.fetchOneShip(shipId) }

}

render() {

 const { ship } = this.props
console.log(ship)
  return (

      <div>
       <h1> {ship.name } </h1>
       <h2> {ship.type} </h2>

      </div>
    )
  }
}


const mapStateToProps = ({ ships }, { match }) => {
const ship = ships.filter((t) => (t.id === +match.params.shipId))[0]

return {
  ship
  }
}

export default connect(mapStateToProps, { fetchOneShip, push }) (Training)
