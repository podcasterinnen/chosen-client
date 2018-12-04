import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import querySearch from 'stringquery'
import { Link, withRouter } from 'react-router-dom'

import './ResetPassword.css'
import { resetPassword, initialiseResetPassword } from './ResetPasswordActions'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      passwordValid: true,
      passwordControl: '',
      passwordControlValid: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.handleInitResetPassword()
  }

  handleChange = (e, type) => {
    switch(type) {
    case 'password':
      this.setState({ password: e.target.value }, () => {
        this.handlePasswordResetFormValidation()
        this.handlePasswordValidation()
      })
      break
    case 'passwordControl':
      this.setState({ passwordControl: e.target.value }, () => {
        this.handlePasswordResetFormValidation()
        this.handlePasswordControlValidation()
      })
      break
    default:
      return
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

  handlePasswordResetRequest = () => {
    const key = querySearch(this.props.location.search, { ignoreQueryPrefix: true }).key
    // check if there is a url parameter key
    // that is a string to verify email address
    if (key && typeof key === 'string') {
      this.props.handleResetPassword(key, this.state.password)
    }
  }

  handlePasswordResetFormValidation = () => {
    // Validate for Submit Button
    if (this.state.password.length >= 8 &&
      this.state.passwordControl === this.state.password) {
      this.setState({
        isEnabledForResetPassword: true,
      })
    } else {
      this.setState({ isEnabledForResetPassword: false })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handlePasswordResetRequest()
  }

  render() {
    const { resetPasswordState } = this.props
    const { isEnabledForResetPassword } = this.state

    return (
      <section className="main__section">
        { resetPasswordState === 'UNKNOWN' &&
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h1>Lege ein neues Passwort an:</h1>
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
            <button className="button" type="submit" value="submit" disabled={!isEnabledForResetPassword}>Neues Passwort speichern</button>
          </form>
        }
        { resetPasswordState === 'ERROR' &&
          <p>Dein neues Passwort konnte leider nicht angelegt werden. Schreibe uns gerne eine E-Mail an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a>. Wir versuchen das Problem so schnell wie möglich zu beheben.</p>
        }
        { resetPasswordState === 'SUCCESS' &&
          <p>Dein neues Passwort wurde erfolgreich gespeichert. <Link to="/session">Logge dich ein</Link>, um dein Profil anzulegen und zu bearbeiten.</p>
        }
      </section>
    )
  }
}

ResetPassword.propTypes = {
  resetPasswordState: PropTypes.string,
  handleResetPassword: PropTypes.func,
  handleInitResetPassword: PropTypes.func,
  location: PropTypes.object.isRequired,
}

ResetPassword.defaultProps = {
  resetPasswordState: 'UNKNOWN',
  handleResetPassword: undefined,
  handleInitResetPassword: undefined,
}

const mapDispatchToProps = (dispatch) => ({
  handleResetPassword: (key, password) => {
    dispatch(resetPassword(key, password))
  },
  handleInitResetPassword: () => {
    dispatch(initialiseResetPassword())
  },
})

const mapStateToProps = (state) => ({
  resetPasswordState: state.resetPasswordReducer.resetPasswordState,
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword))
