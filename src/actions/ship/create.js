import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const SHIP_CREATED = 'SHIP_CREATED'

const api = new API()

export const createShip = (ship) => {
  return dispatch => {
      dispatch({ type: APP_LOADING })

          api.post('/ships', ship)
            .then(() => {
              dispatch({ type: SHIP_CREATED })

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
