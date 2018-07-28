const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_CONTACT': 
      console.log('Contact Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer