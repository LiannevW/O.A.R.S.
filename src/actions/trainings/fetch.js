import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

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

export const fetchOneTraining = (trainingId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`/trainings/${trainingId}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
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

export const fetchOneTrainingData = (trainingId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`/trainingsdata/${trainingId}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
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

export const fetchOneBoatTrainingsData = (trainingId, boatNumber) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.get(`/trainingsdata/${trainingId}/${boatNumber}`)
    .then((res) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
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
