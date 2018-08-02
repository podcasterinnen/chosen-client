import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initialiseSession, logoutUser } from '../../containers/Session/SessionActions'

class MainNav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.handleLogoutUser()
  }

  render() {
    const { sessionState } = this.props

    return(
      <nav>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/podcasterinnen">Podcasterinnen</Link></li>
          { sessionState === 'LOGGED_IN' &&
            <li><Link to="/profile">Profil</Link></li>
          }
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/about">Über uns</Link></li>
          <li>
            <Link to="/session">
              { (sessionState === 'UNKNOWN' ||
                sessionState === 'INVALID' ||
                sessionState === 'REGISTRATION_IN_PROGRESS') &&
                <span>Login</span>
              }
              { sessionState === 'REGISTERED' &&
                <span>Register</span>
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