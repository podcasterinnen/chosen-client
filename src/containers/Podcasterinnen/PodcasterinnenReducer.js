const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'RECEIVE_PODCASTERINNEN':
    return {...store, podcasterinnen: action.payload.data}
  case 'REQUEST_PODCASTERINNEN':
    return {...store}
  default:
    return {...store }
  }
}

export default reducer