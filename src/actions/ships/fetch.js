import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

import API from '../../api/client'

export const FETCHED_SHIPS = 'FETCHED_SHIPS'

const api = new API()

export const fetchShips= () => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get('/rowers')
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_SHIPS,
        payload: res.body
      })
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
