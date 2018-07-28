const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_PODCASTERINNEN': 
      console.log('Podcasterinnen Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer