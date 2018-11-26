import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import About from '../../containers/About/About'
import App from '../../containers/App/App'
import Confirm from '../../containers/Confirm/Confirm'
import Faq from '../../containers/Faq/Faq'
import Imprint from '../../containers/Imprint/Imprint'
import NotFound from '../../containers/NotFound/NotFound'
import Podcasterinnen from '../../containers/Podcasterinnen/Podcasterinnen'
import Privacy from '../../containers/Privacy/Privacy'
import Profile from '../../containers/Profile/Profile'
import Session from '../../containers/Session/Session'

import FooterNav from '../FooterNav/FooterNav'
import MainNav from '../MainNav/MainNav'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

import {
  LOGGED_IN,
} from '../../utils/types'

const PrivateRoute = ({ component: Component, sessionState, ...rest }) => {
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

class PodcasterinnenRouter extends Component {
  
  render() {
    const { sessionState } = this.props

    return (
      <Router>
        <ScrollToTop>
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
              <PrivateRoute sessionState={sessionState} path="/profile" component={Profile} />
              <Route path="/session" component={Session} />
              <Route component={NotFound} />
            </Switch>
            <FooterNav></FooterNav>
          </main>
        </ScrollToTop>
      </Router>
    )
  }
}

PodcasterinnenRouter.propTypes = {
  sessionState: PropTypes.string,
}

PodcasterinnenRouter.defaultProps = {
  sessionState: undefined,
}

const mapStateToProps = (state) => ({
  sessionState: state.sessionReducer.sessionState,
})

export default connect(
  mapStateToProps,
  null,
)(PodcasterinnenRouter)