import { FETCHED_ROWERS } from '../actions/rowers'
import { ROWER_CREATED } from '../actions/rowers'
import { FETCHED_ONE_ROWER } from '../actions/rowers'
export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_ROWERS:
      return [ ...payload ]

    case FETCHED_ONE_ROWER :

     const rowerIds = state.map(t => t.id)

     if (rowerIds.indexOf(payload.id) < 0) {
      return [{ ...payload }].concat(state)
     }

      return state.map((rower) => {
       if (rower.id === payload.id) {
        return { ...payload }
      }
        return [rower]

      })

    case ROWER_CREATED:
      const newRower = {...payload}
        return [newRower].concat(state)

    default:
     return state

    }
  }
