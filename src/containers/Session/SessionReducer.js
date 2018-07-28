const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_SESSION': 
      console.log('Session Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer