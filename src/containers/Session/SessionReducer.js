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
      console.log('Session Initialised.')
      let state = UNKNOWN
      if (localStorage.getItem(LOCAL_STORAGE_USER_ID)) {
        state = LOGGED_IN
      }
      return {...store, sessionState: state}
    case 'LOGIN_SUCCESS':
      console.log('Login successful.', action)
      return {...store, sessionState: LOGGED_IN}
    case 'LOGOUT_SUCCESS':
      console.log('Logout successful.', action)
      return {...store, sessionState: REGISTERED}
    case 'LOGIN_REQUEST':
      console.log('Login requested.', action)
      return {...store, sessionState: LOGIN_IN_PROGRESS}
    case 'REGISTER_SUCCESS':
      console.log('Registration successful.', action)
      return {...store, sessionState: REGISTERED}
    case 'REGISTER_REQUEST':
      console.log('Registration requested.', action)
      return {...store, sessionState: REGISTRATION_IN_PROGRESS}
    case 'SESSION_ERROR':
      console.log('Something went wrong.', action)
      return {...store, sessionState: INVALID}
    case 'SET_SESSION_STATE': 
      console.log('New Session State.', action)
      return {...store, sessionState: action.payload}
    default:
      return {...store }
  }
}

export default reducer