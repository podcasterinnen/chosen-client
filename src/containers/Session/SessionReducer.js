const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_SESSION': 
      console.log('Session Initialised.')
      return {...store, sessionState: 'UNKNOWN'}
    case 'SET_SESSION_STATE': 
      console.log('New Session State.', action)
      return {...store, sessionState: action.payload}
    default:
      return {...store }
  }
}

export default reducer