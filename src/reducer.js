import { combineReducers } from 'redux'

import confirmReducer from './containers/Confirm/ConfirmReducer'
import profileReducer from './containers/Profile/ProfileReducer'
import podcasterinnenReducer from './containers/Podcasterinnen/PodcasterinnenReducer'
import sessionReducer from './containers/Session/SessionReducer'

const chosenApp = combineReducers({
  confirmReducer,
  podcasterinnenReducer,
  profileReducer,
  sessionReducer,
})

export default chosenApp