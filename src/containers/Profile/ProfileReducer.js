const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_PROFILE': 
      console.log('Profile Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer