import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ROWER_CREATED = 'ROWER_CREATED'
export const ROWERS_CREATED = 'ROWERS_CREATED'

const api = new API()

export const createRower = (rower) => {
  return dispatch => {
      dispatch({ type: APP_LOADING })

          api.post('/rowers', rower)
            .then((res) => {
              dispatch({
                type: ROWER_CREATED,
                payload: res.body
              })
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


export const createRowersAndShip = (rowers,  shipId, trainingId, boat_number_name) => {
  return dispatch => {
      dispatch({ type: APP_LOADING })

      api.post('/rowersToTraining', {rowers, shipId, trainingId, boat_number_name})
        .then(() => {
          dispatch({ type: ROWERS_CREATED })
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
