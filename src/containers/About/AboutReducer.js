const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_ABOUT': 
      console.log('About Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer