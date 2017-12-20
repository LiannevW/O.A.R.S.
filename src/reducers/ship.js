import { FETCHED_SHIPS } from '../actions/ship'
import { SHIP_CREATED } from '../actions/ship'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_SHIPS:
      return [ ...payload ]

    case SHIP_CREATED:
      const newShip = {...payload}
      return [newShip].concat(state)

    default:
     return state

    }
  }
