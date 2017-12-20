import { FETCHED_ROWERS } from '../actions/rower'
import { ROWER_CREATED } from '../actions/rower'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_ROWERS:
      return [ ...payload ]

    case ROWER_CREATED:
      const newRower = {...payload}
        return [newRower].concat(state)

    default:
     return state

    }
  }
