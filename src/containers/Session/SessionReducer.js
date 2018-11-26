import {
  INVALID,
  LOCAL_STORAGE_USER_ID,
  LOGGED_IN,
  LOGIN_IN_PROGRESS,
  REGISTERED,
  REGISTRATION_IN_PROGRESS,
  UNKNOWN,
} from '../../utils/types'

const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'INITIALISE_SESSION': 
    let state = UNKNOWN
    if (localStorage.getItem(LOCAL_STORAGE_USER_ID)) {
      console.log('Initializing session')
      state = LOGGED_IN
    }
    return {...store, sessionState: state}
  case 'LOGIN_SUCCESS':
    return {...store, sessionState: LOGGED_IN}
  case 'LOGOUT_SUCCESS':
    return {...store, sessionState: REGISTERED}
  case 'LOGIN_REQUEST':
    return {...store, sessionState: LOGIN_IN_PROGRESS}
  case 'REGISTER_SUCCESS':
    return {...store, sessionState: REGISTERED}
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