import { combineReducers } from 'redux'

import confirmReducer from './containers/Confirm/ConfirmReducer'
import profileReducer from './containers/Profile/ProfileReducer'
import podcasterinnenReducer from './containers/Podcasterinnen/PodcasterinnenReducer'
import resetPasswordReducer from './containers/ResetPassword/ResetPasswordReducer'
import sessionReducer from './containers/Session/SessionReducer'

const chosenApp = combineReducers({
  confirmReducer,
  podcasterinnenReducer,
  profileReducer,
  resetPasswordReducer,
  sessionReducer,
})

export default chosenApp