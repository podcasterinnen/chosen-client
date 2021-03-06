import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Redirect, withRouter } from 'react-router-dom'

import './MainNav.css'
import { initialiseSession, logoutUser } from '../../containers/Session/SessionActions'

class MainNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuIsOpen: false,
      wasLoggedOut: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  handleLogout = (e) => {
    this.props.handleLogoutUser()
    this.setState({ wasLoggedOut: true })
  }

  handleMenuClick = (e) => {
    e.preventDefault()
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    })
  }

  onRouteChanged() {
    this.setState({
      menuIsOpen: false,
    })
  }

  render() {
    const { sessionState } = this.props
    const { menuIsOpen, wasLoggedOut } = this.state

    return(
      <nav className="mainnav">
        <button className="mainnav__button" onClick={this.handleMenuClick}>
          Menü
          { menuIsOpen &&
            <span> schließen</span>
          }
        </button>
        <ol className={menuIsOpen ? 'mainnav__list mainnav__list--open' : 'mainnav__list'}>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/"
            >
              podcasterinnen.org
            </NavLink>
          </li>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/podcasterinnen"
            >
              Profile
            </NavLink>
          </li>
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
              className="mainnav__list__element__link"
              exact
              to="/blog"
            >
              Blog
            </NavLink>
          </li>
          <li className="mainnav__list__element">
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/support"
            >
              Support
            </NavLink>
          </li>
          { sessionState === 'LOGGED_IN' &&
            <li className="mainnav__list__element mainnav__list__element--right">
              <NavLink
                activeClassName="mainnav__list__element__link--active"
                className="mainnav__list__element__link"
                exact
                to="/profile"
              >
                Mein Profil
              </NavLink>
            </li>
          }
          <li className={( sessionState === 'LOGGED_IN') ? 'mainnav__list__element mainnav__list__element--rightest mainnav__list__element--hidden' : 'mainnav__list__element mainnav__list__element--right'}>
            <NavLink
              activeClassName="mainnav__list__element__link--active"
              className="mainnav__list__element__link"
              exact
              to="/session"
            >
              { (sessionState === 'UNKNOWN' ||
                sessionState === 'INVALID' ||
                sessionState === 'REGISTRATION_IN_PROGRESS' ||
                sessionState === 'FORGOT_PASSWORD') &&
                <span>Registrieren / Login</span>
              }
              { sessionState === 'REGISTERED' &&
                <span>Login</span>
              }
            </NavLink>
          </li>
          <li className={( sessionState === 'LOGGED_IN') ? 'mainnav__list__element mainnav__list__element--rightest' : 'mainnav__list__element mainnav__list__element--rightest mainnav__list__element--hidden'}>
              { sessionState === 'LOGGED_IN' &&
                <span className="mainnav__list__element__link">
                  <span onClick={this.handleLogout}>Logout</span>
                  { wasLoggedOut &&
                  <Redirect to="/" />
                  }
                </span>
              }
            </li>
        </ol>
      </nav>
    )
  }
}

MainNav.propTypes = {
  handleLogoutUser: PropTypes.func,
  location: PropTypes.object.isRequired,
  sessionState: PropTypes.string,
}

MainNav.defaultProps = {
  handleLogoutUser: undefined,
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