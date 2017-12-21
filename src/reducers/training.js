import { FETCHED_TRAININGS, FETCHED_ONE_TRAINING } from '../actions/training'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_TRAININGS:
      return [ ...payload ]

      case FETCHED_ONE_TRAINING :
           const trainingIds = state.map(t => t.id)
          if (trainingIds.indexOf(payload.id) < 0) {
            return [{ ...payload }].concat(state)
         }

         return state.map((training) => {
           if (training.id === payload.id) {
             return { ...payload }
           }
         return [ training ]
       })

    default:
     return state

    }
  }
