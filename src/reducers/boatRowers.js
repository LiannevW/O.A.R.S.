import { BOATROWERS_FETCHED } from '../actions/rowers'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  BOATROWERS_FETCHED:
      return payload

    default:
     return state
     
    }
  }
