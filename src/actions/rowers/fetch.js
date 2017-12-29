import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

import API from '../../api/client'

export const FETCHED_ROWERS = 'FETCHED_ROWERS'
export const FETCHED_ONE_ROWER = 'FETCHED_ONE_ROWER'
export const BOATROWERS_FETCHED = 'BOATROWERS_FETCHED'

const api = new API()

export const fetchRowers= () => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get('/rowers')
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_ROWERS,
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

export const fetchOneRower = (id) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`/rowers/${id}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_ONE_ROWER,
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

export const fetchboatRowers = (trainingId, boat_number) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`/rowersToTraining/${trainingId}/${boat_number}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: BOATROWERS_FETCHED,
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
