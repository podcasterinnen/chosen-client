const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_SESSION': 
      console.log('Session Initialised.')
      return {...store, sessionState: 'UNKNOWN'}
    case 'LOGIN_SUCCESS':
      console.log('Login successful.', action)
      return {...store, sessionState: 'LOGGED_IN'}
    case 'REGISTER_REQUEST':
      console.log('Login requested.', action)
      return {...store, sessionState: 'LOGIN_IN_PROGRESS'}
    case 'REGISTER_SUCCESS':
      console.log('Registration successful.', action)
      return {...store, sessionState: 'REGISTRATION_IN_PROGRESS'}
    case 'REGISTER_REQUEST':
      console.log('Registration requested.', action)
      return {...store, sessionState: 'REGISTRATION_IN_PROGRESS'}
    case 'SET_SESSION_STATE': 
      console.log('New Session State.', action)
      return {...store, sessionState: action.payload}
    default:
      return {...store }
  }
}

export default reducer