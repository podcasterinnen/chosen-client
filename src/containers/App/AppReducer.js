const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_APP': 
      console.log('App Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer