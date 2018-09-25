const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_NOT_FOUND': 
      console.log('Not Found Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer