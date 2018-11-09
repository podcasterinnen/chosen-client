const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'CONFIRM_ERROR':
      console.log('Confirm error.', action)
      return {...store, confirmState: 'ERROR'}
    case 'CONFIRM_SUCCESS':
      console.log('Confirm success.', action)
      return {...store, confirmState: 'SUCCESS'}
    case 'INITIALISE_CONFIRM':
      console.log('Confirm Initialised.')
      return {...store, confirmState: 'UNKNOWN'}
    default:
      return {...store }
  }
}

export default reducer