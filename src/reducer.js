import { combineReducers } from 'redux'

import aboutReducer from './containers/About/AboutReducer'
import appReducer from './containers/App/AppReducer'
import faqReducer from './containers/Faq/FaqReducer'
import imprintReducer from './containers/Imprint/ImprintReducer'
import profileReducer from './containers/Profile/ProfileReducer'
import podcasterinnenReducer from './containers/Podcasterinnen/PodcasterinnenReducer'
import privacyReducer from './containers/Privacy/PrivacyReducer'
import sessionReducer from './containers/Session/SessionReducer'

const chosenApp = combineReducers({
  aboutReducer,
  appReducer,
  faqReducer,
  imprintReducer,
  podcasterinnenReducer,
  privacyReducer,
  profileReducer,
  sessionReducer,
})

export default chosenApp