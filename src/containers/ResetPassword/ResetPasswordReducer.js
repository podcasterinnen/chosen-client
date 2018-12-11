const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'RESET_PASSWORD_ERROR':
    return {...store, resetPasswordState: 'ERROR'}
  case 'RESET_PASSWORD_SUCCESS':
    return {...store, resetPasswordState: 'SUCCESS'}
  case 'INITIALISE_RESET_PASSWORD':
    return {...store, resetPasswordState: 'UNKNOWN'}
  default:
    return {...store }
  }
}

export default reducer