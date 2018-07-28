const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'INITIALISE_FAQ': 
      console.log('Faq Initialised.')
      return {...store}
    default:
      return {...store }
  }
}

export default reducer