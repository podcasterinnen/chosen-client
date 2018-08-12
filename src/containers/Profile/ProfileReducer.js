const defaultStore = {}

const STATE_DEFAULT = 'STATE_DEFAULT'
const STATE_EDITING = 'STATE_EDITING'
const STATE_SENDING_REQUEST = 'STATE_SENDING_REQUEST'
const STATE_REQUEST_SUCCESSFUL = 'STATE_REQUEST_SUCCESSFUL'
const STATE_REQUEST_ERROR = 'STATE_REQUEST_ERROR'

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case 'EDIT_ERROR':
      return {...store, state: STATE_REQUEST_ERROR}
    case 'EDITING_PROFILE':
      return {...store, state: STATE_EDITING}
    case 'EDIT_REQUEST':
      return {...store, state: STATE_SENDING_REQUEST}
    case 'EDIT_SUCCESS':
      return {...store, state: STATE_REQUEST_SUCCESSFUL, profile: action.payload.data}
    case 'RECEIVE_PROFILE':
      console.log('Profile received.', action)
      return {...store, profile: action.payload.data}
    case 'REQUEST_PROFILE':
      console.log('Profile requested.', action)
      return {...store}
    default:
      return {...store }
  }
}

export default reducer