import {
  INVALID,
  LOCAL_STORAGE_USER_ID,
  LOGGED_IN,
  LOGIN_IN_PROGRESS,
  FORGOT_PASSWORD_IN_PROGRESS,
  FORGOT_PASSWORD_SUCCESS,
  REGISTERED,
  REGISTRATION_IN_PROGRESS,
  REGISTER_SUCCESS,
  UNKNOWN,
} from '../../utils/types'

const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'INITIALISE_SESSION':
    let state = UNKNOWN
    if (localStorage.getItem(LOCAL_STORAGE_USER_ID)) {
      state = LOGGED_IN
    } else if (action.payload === true) {
      state = REGISTERED
    }
    return {...store, sessionState: state}
  case 'LOGIN_SUCCESS':
    return {...store, sessionState: LOGGED_IN}
  case 'LOGOUT_SUCCESS':
    return {...store, sessionState: REGISTERED}
  case 'LOGIN_REQUEST':
    return {...store, sessionState: LOGIN_IN_PROGRESS}
  case 'FORGOT_PASSWORD_ERROR':
    return {...store, sessionState: INVALID}
  case 'FORGOT_PASSWORD_SUCCESS':
    return {...store, sessionState: FORGOT_PASSWORD_SUCCESS}
  case 'FORGOT_PASSWORD_REQUEST':
    return {...store, sessionState: FORGOT_PASSWORD_IN_PROGRESS}
  case 'REGISTER_SUCCESS':
    return {...store, sessionState: REGISTER_SUCCESS}
  case 'REGISTER_REQUEST':
    return {...store, sessionState: REGISTRATION_IN_PROGRESS}
  case 'SESSION_ERROR':
    return {...store, sessionState: INVALID}
  case 'SET_SESSION_STATE':
    return {...store, sessionState: action.payload}
  default:
    return {...store }
  }
}

export default reducer