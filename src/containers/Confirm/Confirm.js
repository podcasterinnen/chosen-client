import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import querySearch from 'stringquery'
import { Link, withRouter } from 'react-router-dom'

import './Confirm.css'
import { confirmEmail, initialiseConfirm } from './ConfirmActions'
import { REGISTERED, LOGGED_IN } from '../../utils/types'

class Confirm extends Component {

  componentDidMount() {
    const key = querySearch(this.props.location.search, { ignoreQueryPrefix: true }).key
    this.props.handleInitConfirm()
    // check if there is a url parameter key
    // that is a string to verify email address
    if (key && typeof key === 'string') {
      this.props.handleEmailConfirmation(key)
    }
    document.title = 'podcasterinnen.org'
  }

  render() {
    const { confirmState } = this.props

    return (
      <section className="main__section">
        { confirmState === 'UNKNOWN' &&
          <p>Deine E-Mail-Adresse wird gerade verifiziert, bitte habe ein wenig Geduld.</p>
        }
        { confirmState === 'ERROR' &&
          <p>Deine E-Mail-Adresse konnte leider nicht verifiziert werden. Schreibe uns gerne eine E-Mail an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a>. Wir versuchen das Problem so schnell wie möglich zu beheben.</p>
        }
        { confirmState === 'SUCCESS' &&
          <p>Deine E-Mail-Adresse wurde erfolgreich verifiziert. <Link to={{ pathname: '/session', state: { sessionState: LOGGED_IN }}}>Logge dich ein</Link>, um dein Profil anzulegen und zu bearbeiten.</p>
        }
      </section>
    )
  }
}

Confirm.propTypes = {
  confirmState: PropTypes.string,
  handleEmailConfirmation: PropTypes.func,
  handleInitConfirm: PropTypes.func,
  location: PropTypes.object.isRequired,
}

Confirm.defaultProps = {
  confirmState: 'UNKNOWN',
  handleEmailConfirmation: undefined,
  handleInitConfirm: undefined,
}

const mapDispatchToProps = (dispatch) => ({
  handleEmailConfirmation: (key) => {
    dispatch(confirmEmail(key))
  },
  handleInitConfirm: () => {
    dispatch(initialiseConfirm())
  },
})

const mapStateToProps = (state) => ({
  confirmState: state.confirmReducer.confirmState,
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm))
