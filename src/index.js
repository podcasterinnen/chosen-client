import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import 'normalize.css'
import './index.css'
import { 
  LOGGED_IN,
} from './utils/types'

import About from './containers/About/About'
import App from './containers/App/App'
import Contact from './containers/Contact/Contact'
import Faq from './containers/Faq/Faq'
import Imprint from './containers/Imprint/Imprint'
import NotFound from './containers/NotFound/NotFound'
import Podcasterinnen from './containers/Podcasterinnen/Podcasterinnen'
import Privacy from './containers/Privacy/Privacy'
import Profile from './containers/Profile/Profile'
import Session from './containers/Session/Session'

import FooterNav from './components/FooterNav/FooterNav'
import MainNav from './components/MainNav/MainNav'


import { initialiseSession } from './containers/Session/SessionActions'
import chosenApp from './reducer'

const store = createStore(
  chosenApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)
store.dispatch(initialiseSession())
const sessionState = store.getState().sessionReducer.sessionState

const PrivateRoute = ({ component: Component, sessionState, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionState === LOGGED_IN ? (
        <Component {...props} />
      ) : (
        <Redirect to="/session" />
      )
    }
  />
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <main className="main" role="main">
        <MainNav></MainNav>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={Faq} />
          <Route path="/imprint" component={Imprint} />
          <Route path="/podcasterinnen" component={Podcasterinnen} />
          <Route path="/privacy" component={Privacy} />
          <PrivateRoute sessionState={sessionState} path="/profile" component={Profile} />
          <Route path="/session" component={Session} />
          <Route component={NotFound} />
        </Switch>
        <FooterNav></FooterNav>
      </main>
    </Router>
  </Provider>, 
  document.getElementById('root'),
)

registerServiceWorker()
