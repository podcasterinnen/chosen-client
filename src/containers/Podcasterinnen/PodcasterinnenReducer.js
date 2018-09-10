const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'RECEIVE_PODCASTERINNEN':
      console.log('Podcasterinnen received.', action)
      return {...store, podcasterinnen: action.payload.data}
    case 'REQUEST_PODCASTERINNEN':
      console.log('Podcasterinnen requested.', action)
      return {...store}
    default:
      return {...store }
  }
}

export default reducer