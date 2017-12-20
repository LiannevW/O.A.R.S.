import { USER_SIGNED_IN } from '../actions/users/log-in'
//import { USER_SIGNED_OUT } from '../actions/user/sign-out'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case USER_SIGNED_IN :
      return { ...payload }

    // case USER_SIGNED_OUT :
    //   return null

    default :
      return state
  }
}
