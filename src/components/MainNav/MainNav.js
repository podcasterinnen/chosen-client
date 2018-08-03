import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './MainNav.css'
import { initialiseSession, logoutUser } from '../../containers/Session/SessionActions'

class MainNav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.handleLogoutUser()
  }

  render() {
    const { sessionState } = this.props

    return(
      <nav className="mainnav">
        <ol className="mainnav__list">
          <li className="mainnav__list__element">
            <Link className="mainnav__list__element__link" to="/">Home</Link>
          </li>
          <li className="mainnav__list__element">
            <Link className="mainnav__list__element__link" to="/podcasterinnen">Podcasterinnen</Link>
          </li>
          { sessionState === 'LOGGED_IN' &&
            <li className="mainnav__list__element">
              <Link className="mainnav__list__element__link" to="/profile">Profil</Link>
            </li>
          }
          <li className="mainnav__list__element">
            <Link className="mainnav__list__element__link" to="/faq">FAQ</Link>
          </li>
          <li className="mainnav__list__element">
            <Link className="mainnav__list__element__link" to="/about">Über uns</Link>
          </li>
          <li className="mainnav__list__element">
            <Link className="mainnav__list__element__link" to="/session">
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
            </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNav)