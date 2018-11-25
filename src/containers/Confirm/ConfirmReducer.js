const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'CONFIRM_ERROR':
    return {...store, confirmState: 'ERROR'}
  case 'CONFIRM_SUCCESS':
    return {...store, confirmState: 'SUCCESS'}
  case 'INITIALISE_CONFIRM':
    return {...store, confirmState: 'UNKNOWN'}
  default:
    return {...store }
  }
}

export default reducer