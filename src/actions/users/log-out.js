import API from '../../api/client'
import { push } from 'react-router-redux'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()

export default () => {
  return dispatch => {
    api.logOut()
    dispatch(push('/login'))
    dispatch({
      type: USER_SIGNED_OUT
    })
  }
}
