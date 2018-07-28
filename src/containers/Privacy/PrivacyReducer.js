const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_PRIVACY': 
      console.log('Privacy Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer