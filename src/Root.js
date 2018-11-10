import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import About from './containers/About/About'
import App from './containers/App/App'
import Confirm from './containers/Confirm/Confirm'
import Faq from './containers/Faq/Faq'
import Imprint from './containers/Imprint/Imprint'
import NotFound from './containers/NotFound/NotFound'
import Podcasterinnen from './containers/Podcasterinnen/Podcasterinnen'
import Privacy from './containers/Privacy/Privacy'
import Profile from './containers/Profile/Profile'
import Session from './containers/Session/Session'

import FooterNav from './components/FooterNav/FooterNav'
import MainNav from './components/MainNav/MainNav'

import {
  LOGGED_IN,
} from './utils/types'
import { initialiseSession } from './containers/Session/SessionActions'

const PrivateRoute = ({ component: Component, sessionState, ...rest }) => {
  console.log(sessionState)
  return (
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
}

const Root = ({ store }) => {
  console.log(store.getState().sessionReducer.sessionState)
  store.dispatch(initialiseSession())
  return(
    <Provider store={store}>
      <Router>
        <main className="main" role="main">
          <MainNav></MainNav>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/faq" component={Faq} />
            <Route path="/imprint" component={Imprint} />
            <Route path="/podcasterinnen" component={Podcasterinnen} />
            <Route path="/privacy" component={Privacy} />
            <PrivateRoute sessionState={store.getState().sessionReducer.sessionState} path="/profile" component={Profile} />
            <Route path="/session" component={Session} />
            <Route component={NotFound} />
          </Switch>
          <FooterNav></FooterNav>
        </main>
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root