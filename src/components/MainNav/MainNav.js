import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import './MainNav.css'
import { initialiseSession, logoutUser } from '../../containers/Session/SessionActions'

class MainNav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.handleLogoutUser()
  }

  render() {
    const { sessionState } = this.props

    console.log('!!', this.props)

    return(
      <nav className="mainnav">
        <ol className="mainnav__list">
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/podcasterinnen"
            >
              Podcasterinnen
            </NavLink>
          </li>
          { sessionState === 'LOGGED_IN' &&
            <li className="mainnav__list__element">
              <NavLink
                activeClassName="mainnav__list__element__link--active"
                className="mainnav__list__element__link"
                exact
                to="/profile"
              >
                Profil
              </NavLink>
            </li>
          }
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/faq"
            >
              FAQ
            </NavLink>
          </li>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/about"
            >
              Über uns
            </NavLink>
          </li>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link mainnav__list__element__link--right"
              exact
              to="/session"
            >
              { (sessionState === 'UNKNOWN' ||
                sessionState === 'INVALID' ||
                sessionState === 'REGISTRATION_IN_PROGRESS') &&
                <span>Register</span>
              }
              { sessionState === 'REGISTERED' &&
                <span>Login</span>
              }
              { sessionState === 'LOGGED_IN' &&
                <span onClick={this.handleLogout}>Logout</span>
              }
            </NavLink>
          </li>
        </ol>
      </nav>
    )
  }
}

MainNav.propTypes = {
  sessionState: PropTypes.string,
}

MainNav.defaultProps = {
  sessionState: 'UNKNOWN',
}

const mapDispatchToProps = (dispatch) => ({
  handleInitSession: () => {
    dispatch(initialiseSession())
  },
  handleLogoutUser: () => {
    dispatch(logoutUser())
  },
})

const mapStateToProps = (state) => ({
  sessionState: state.sessionReducer.sessionState,
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNav))