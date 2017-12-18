import { ROWER_CREATED  } from '../actions/rower/create'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case ROWER_CREATED :
      const newRower = { ...payload }
      return [newRower].concat(state)

    default :
      return state
  }
}
