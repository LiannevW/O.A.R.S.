import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'

export const FETCHED_TRAININGS = 'FETCHED_TRAININGS'
export const FETCHED_ONE_TRAINING = 'FETCHED_ONE_TRAINING'

const api = new API()

export const fetchTrainings = () => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get('/trainings')
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      console.log(res)
      dispatch({
        type: FETCHED_TRAININGS,
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

export const fetchOneTraining = (trainingsId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`trainings/${trainingsId}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      console.log(res)
      dispatch({
        type: FETCHED_ONE_TRAINING,
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
