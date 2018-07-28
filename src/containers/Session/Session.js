import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Session.css'
import { initialiseSession, loginUser, registerNewUser, setSessionState } from './SessionActions'

class Session extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailAddress: '',
      forename: '',
      password: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleForenameChange = this.handleForenameChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
  }
  componentDidMount() {
    this.props.handleInitSession()
  }

  handleEmailChange = (e) => {
    this.setState({ emailAddress: e.target.value })
  }

  handleForenameChange = (e) => {
    this.setState({ forename: e.target.value })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    this.props.handleLoginNewUser(this.state.emailAddress, this.state.password)
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    this.props.handleRegisterNewUser(this.state.emailAddress, this.state.forename, this.state.password)
  }

  handleToggleClick = () => {
    switch (this.props.sessionState) {
      case 'UNKNOWN':
        this.props.handleSetSessionState('REGISTERED')
        break
      case 'REGISTERED':
        this.props.handleSetSessionState('UNKNOWN')
        break
      default:
        return
    }
  }

  render() {
    const { sessionState } = this.props

    return (
      <div className="Session">
        <p className="Session-intro">
          Session
        </p>
        <div>
          { sessionState === 'UNKNOWN' &&
            <button onClick={this.handleToggleClick}>Login</button>
          }
          { sessionState === 'REGISTERED' &&
            <button onClick={this.handleToggleClick}>Register</button>
          }
        </div>
        { sessionState === 'UNKNOWN' &&
          <form onSubmit={this.handleRegisterSubmit}>
            <h2>Registrieren:</h2>
            <div>
              <label>Dein Vorname:</label>
              <input onChange={this.handleForenameChange} placeholder="Your forename" type="text" value={this.state.forename} />
            </div>
            <div>
              <label>Email address</label>
              <input onChange={this.handleEmailChange} placeholder="Your email address" type="email" value={this.state.emailAddress} />
            </div>
            <div>
              <label>Password</label>
              <input onChange={this.handlePasswordChange} placeholder="Your safe password." type="password" value={this.state.password} />
            </div>
            <button type="submit" value="submit">Registrieren</button>
          </form>
        }
        { sessionState === 'REGISTERED' &&
          <form>
            <h2>Login:</h2>
            <div>
              <label>Email address</label>
              <input placeholder="Your email address" type="email" />
            </div>
            <div>
              <label>Password</label>
              <input placeholder="Your safe password." type="password" />
            </div>
            <button type="submit">Login</button>
          </form>
        }
        { sessionState === 'REGISTRATION_IN_PROGRESS' &&
          <p>
            Validiere deine E-Mail-Adresse.
          </p>
        }
        { sessionState === 'LOGGED_IN' &&
          <p>
            Du bist erfolgreich eingelogged.
          </p>
        }
      </div>
    )
  }
}

Session.propTypes = {
  sessionState: PropTypes.string,
}

Session.defaultProps = {
  sessionState: 'UNKNOWN',
}

const mapDispatchToProps = (dispatch) => ({
  handleInitSession: () => {
    dispatch(initialiseSession())
  },
  handleLoginNewUser: (emailAdress, password) => {
    dispatch(loginUser(emailAdress, password))
  },
  handleRegisterNewUser: (emailAdress, forename, password) => {
    dispatch(registerNewUser(emailAdress, forename, password))
  },
  handleSetSessionState: (newState) => {
    dispatch(setSessionState(newState))
  },
})

const mapStateToProps = (state) => ({
  sessionState: state.sessionReducer.sessionState,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session)
