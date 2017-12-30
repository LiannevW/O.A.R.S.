import API from '../../api/client'
import { push } from 'react-router-redux'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default (user) => {
  return dispatch => {
    api.post('/login', { ...user })
      .then((res) => {

        const jwt = res.body.token
        api.storeToken(jwt)

            dispatch({
              type: USER_SIGNED_IN,
              payload: res.body.token
            })

            dispatch(push('/'))
          })
          .catch((err) => console.error(err))
  }
}
