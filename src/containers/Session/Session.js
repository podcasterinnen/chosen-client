import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import './Session.css'
import { initialiseSession, loginUser, registerNewUser, setSessionState } from './SessionActions'

class Session extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailAddress: '',
      emailAddressValid: true,
      isEnabledForRegistration: false,
      forename: '',
      forenameValid: true,
      password: '',
      passwordValid: true,
      passwordControl: '',
      passwordControlValid: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }
  
  componentDidMount() {
    this.props.handleInitSession()
  }

  handleChange = (e, type) => {
    switch(type) {
    case 'email':
      this.setState({ emailAddress: e.target.value }, () => {
        this.handleRegisterFormValidation()
        this.handleEmailValidation()
      })
      break
    case 'forename':
      this.setState({ forename: e.target.value }, () => {
        this.handleRegisterFormValidation()
      })
      break
    case 'password':
      this.setState({ password: e.target.value }, () => {
        this.handleRegisterFormValidation()
        this.handlePasswordValidation()
      })
      break
    case 'passwordControl':
      this.setState({ passwordControl: e.target.value }, () => {
        this.handleRegisterFormValidation()
        this.handlePasswordControlValidation()
      })
      break
    default:
      return
    }
  }

  handleEmailValidation = () => {
    this.setState({
      emailAddressValid: this.validateEmail(this.state.emailAddress)
    })
  }

  handleForenameValidation = () => {
    if (this.state.forename !== '') {
      this.setState({ forenameValid: true })
    } else {
      this.setState({ forenameValid: false })
    }
  }

  handlePasswordValidation = () => {
    if (this.state.password.length >= 8) {
      this.setState({ passwordValid: true })
    } else {
      this.setState({ passwordValid: false })
    }
  }

  handlePasswordControlValidation = () => {
    if (this.state.passwordControl === this.state.password && this.state.password.length >= 8) {
      this.setState({ passwordControlValid: true })
    } else {
      this.setState({ passwordControlValid: false })
    }
  }

  handleRegisterFormValidation = () => {
    // Validate for Submit Button
    if (this.state.password.length >= 8 &&
      this.state.passwordControl === this.state.password &&
      this.state.forename !== '' &&
      this.state.emailAddress !== '' &&
      this.validateEmail(this.state.emailAddress)) {
      this.setState({
        isEnabledForRegistration: true,
      })
    } else {
      this.setState({ isEnabledForRegistration: false })
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleSubmit = (e, type) => {
    e.preventDefault()
    switch(type) {
    case 'login':
      this.props.handleLoginNewUser(this.state.emailAddress, this.state.password)
      break
    case 'register':
      this.props.handleRegisterNewUser(this.state.emailAddress, this.state.forename, this.state.password)
      break
    default:
      return
    }
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
    const { isEnabledForRegistration } = this.state

    return (
      <div className="session main__section">
        <div className="message-container message-container--align-right">
          { sessionState === 'UNKNOWN' &&
            <button className="button button--decent" onClick={this.handleToggleClick}>Zum Login</button>
          }
          { sessionState === 'REGISTERED' &&
            <button className="button button--decent" onClick={this.handleToggleClick}>Registrieren</button>
          }
        </div>
        { sessionState === 'UNKNOWN' &&
          <form onSubmit={(e) => this.handleSubmit(e, 'register')}>
            <h1>Registrieren:</h1>
            <div>
              <label>Vorname/Nickname:</label>
              <input 
                onChange={(e) => this.handleChange(e, 'forename')} 
                autoComplete="given-name"
                autoCorrect="off" 
                placeholder="Buffy"
                type="text" value={this.state.forename} 
                required
                className={this.state.forenameValid ? 'inputIsValid' : 'inputIsInvalid'}
              />
            </div>
            <div>
              <label>E-Mail-Adresse</label>
              <input 
                onChange={(e) => this.handleChange(e, 'email')} 
                autoCapitalize="off"
                autoComplete="username"
                autoCorrect="off" 
                placeholder="buffy.summers@sunnydaly-high.net" 
                type="email" 
                value={this.state.emailAddress}
                required
                className={this.state.emailAddressValid ? 'inputIsValid' : 'inputIsInvalid'}
              />
            </div>
            <div>
              <label>
                Passwort
                <span className="label label--right">Minimum: 8 Zeichen</span>
              </label>
              <input 
                onChange={(e) => this.handleChange(e, 'password')} 
                autoComplete="current-password" 
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" 
                type="password" 
                value={this.state.password}
                required
                className={this.state.passwordValid ? 'inputIsValid' : 'inputIsInvalid'}
              />
            </div>
            <div>
              <label>
                Passwort wiederholen
                <span className="label label--right">Minimum: 8 Zeichen</span>
              </label>
              <input 
                onChange={(e) => this.handleChange(e, 'passwordControl')}
                autoComplete="current-password" 
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" 
                type="password" 
                value={this.state.passwordControl} 
                required
                className={this.state.passwordControlValid ? 'inputIsValid' : 'inputIsInvalid'}
              />
            </div>
            <button className="button" type="submit" value="submit" disabled={!isEnabledForRegistration}>Registrieren</button>
          </form>
        }
        { sessionState === 'REGISTERED' &&
          <form onSubmit={(e) => this.handleSubmit(e, 'login')}>
            <h1>Login:</h1>
            <div>
              <label>E-Mail-Adresse</label>
              <input 
                onChange={(e) => this.handleChange(e, 'email')} 
                autoCapitalize="off"
                autoComplete="username" 
                autoCorrect="off"
                placeholder="buffy.summers@sunnydale.high.net" 
                type="email" 
              />
            </div>
            <div>
              <label>Passwort</label>
              <input 
                onChange={(e) => this.handleChange(e, 'password')}
                autoComplete="current-password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
              />
            </div>
            <button className="button" type="submit" value="submit">Einloggen</button>
          </form>
        }
        { sessionState === 'REGISTRATION_IN_PROGRESS' &&
          <div>
            <p>
              Liebe Podcasterin,
            </p>
            <p>
              danke für deine Registrierung. Wir schicken dir eine E-Mail an deine angegebene Adresse. Sobald du die E-Mail erhalten hast, klicke bitte auf den Link. Du wirst automatisch zu podcasterinnen.org weitergeleitet. Nun musst du dich mit deiner E-Mail Adresse und deinem Passwort anmelden. Nach erfolgreicher Anmeldung kannst du auch schon mit dem anlegen deines Profils beginnen.
            </p>
            <p>
              Etwas hat nicht geklappt? Schreibe uns gerne an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a>
            </p>
          </div>
        }
        { sessionState === 'INVALID' &&
          <p>
            Hier ist leider etwas schief gegangen.
          </p>
        }
        { sessionState === 'LOGGED_IN' &&
          <Redirect to="/profile" />
        }
      </div>
    )
  }
}

Session.propTypes = {
  handleInitSession: PropTypes.func,
  handleLoginNewUser: PropTypes.func,
  handleRegisterNewUser: PropTypes.func,
  handleSetSessionState: PropTypes.func,
  sessionState: PropTypes.string,
}

Session.defaultProps = {
  handleInitSession: undefined,
  handleLoginNewUser: undefined,
  handleRegisterNewUser: undefined,
  handleSetSessionState: undefined,
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Session))
