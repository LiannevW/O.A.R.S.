import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ROWER_CREATED = 'ROWER_CREATED'

const api = new API()

export const createRower = (rower) => {
  return dispatch => {
      dispatch({ type: APP_LOADING })
          api.post('/rowers', rower)
            .then(() => {
              dispatch({ type: ROWER_CREATED })

              dispatch({ type: APP_DONE_LOADING })
              dispatch({ type: LOAD_SUCCESS })
            })
            .catch((error) => {
              dispatch({ type: APP_DONE_LOADING })
              dispatch({
                type: LOAD_ERROR,
                payload: error.message
              })
            })
        }
      }
