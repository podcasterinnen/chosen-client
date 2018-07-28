const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_IMPRINT': 
      console.log('Imprint Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer