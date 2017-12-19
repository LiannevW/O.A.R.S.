import { FETCHED_TRAININGS, FETCHED_ONE_TRAINING } from '../actions/training'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_TRAININGS:
      return [ ...payload ]

    default:
     return state

    }
  }
