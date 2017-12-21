import { FETCHED_SHIPS } from '../actions/ships'
import { SHIP_CREATED } from '../actions/ships'
import { FETCHED_ONE_SHIP} from '../actions/ships'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_SHIPS:
      return [ ...payload ]

      case FETCHED_ONE_SHIP :

       const shipIds = state.map(t => t.id)

       if (shipIds.indexOf(payload.id) < 0) {
        return [{ ...payload }].concat(state)
       }

        return state.map((ship) => {
         if (ship.id === payload.id) {
          return { ...payload }
        }
          return [ship]

        })

    case SHIP_CREATED:
      const newShip = {...payload}
      return [newShip].concat(state)

    default:
     return state

    }
  }
