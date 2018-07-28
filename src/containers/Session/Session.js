import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Session.css'
import { initialiseSession, setSessionState } from './SessionActions'

class Session extends Component {
  componentDidMount() {
    this.props.handleInitSession()
  }

  handleToggleClick = (e) => {
    console.log(e)
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
          <form>
            <h2>Registrieren:</h2>
            <div>
              <label>Dein Vorname:</label>
              <input placeholder="Your forename" type="text" />
            </div>
            <div>
              <label>Email address</label>
              <input placeholder="Your email address" type="email" />
            </div>
            <div>
              <label>Password</label>
              <input placeholder="Your safe password." type="password" />
            </div>
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
