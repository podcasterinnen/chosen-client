import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'

import About from '../../containers/About/About'
import App from '../../containers/App/App'
import Blog from '../../containers/Blog/Blog'
import Confirm from '../../containers/Confirm/Confirm'
import Faq from '../../containers/Faq/Faq'
import Imprint from '../../containers/Imprint/Imprint'
import NotFound from '../../containers/NotFound/NotFound'
import Podcasterinnen from '../../containers/Podcasterinnen/Podcasterinnen'
import Privacy from '../../containers/Privacy/Privacy'
import Profile from '../../containers/Profile/Profile'
import ResetPassword from '../../containers/ResetPassword/ResetPassword'
import Session from '../../containers/Session/Session'
import Why from '../../containers/Why/Why'

import FooterNav from '../FooterNav/FooterNav'
import MainNav from '../MainNav/MainNav'
import ScrollToTop from '../ScrollToTop/ScrollToTop'


import { logoutUser } from '../../containers/Session/SessionActions'

import {
  LOGGED_IN,
} from '../../utils/types'
import { SESSION_TIMEOUT } from '../../config/config'

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
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onIdle = this.onIdle.bind(this)
  }

  onIdle = () => {
    if (this.props.sessionState === LOGGED_IN) {
      this.props.handleLogoutUser()
    }
  }
  
  render() {
    const { sessionState } = this.props

    return (
      <Router>
        <ScrollToTop>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            onIdle={this.onIdle}
            debounce={250}
            timeout={SESSION_TIMEOUT}
          />
          <main className="main" role="main">
            <MainNav></MainNav>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/about" component={About} />
              <Route path="/blog" component={Blog} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/faq" component={Faq} />
              <Route path="/imprint" component={Imprint} />
              <Route path="/password_resets" component={ResetPassword} />
              <Route path="/podcasterinnen" component={Podcasterinnen} />
              <Route path="/privacy" component={Privacy} />
              <PrivateRoute sessionState={sessionState} path="/profile" component={Profile} />
              <Route path="/session" component={Session} />
              <Route path="/why" component={Why} />
              <Route component={NotFound} />
            </Switch>
            <FooterNav></FooterNav>
          </main>
        </ScrollToTop>
      </Router>
    )
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  sessionState: PropTypes.string.isRequired,
}

PodcasterinnenRouter.propTypes = {
  handleLogoutUser: PropTypes.func,
  sessionState: PropTypes.string,
}

PodcasterinnenRouter.defaultProps = {
  handleLogoutUser: undefined,
  sessionState: undefined,
}

const mapDispatchToProps = (dispatch) => ({
  handleLogoutUser: () => {
    dispatch(logoutUser())
  },
})

const mapStateToProps = (state) => ({
  sessionState: state.sessionReducer.sessionState,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PodcasterinnenRouter)