import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Confirm.css'
import { confirmEmail, initialiseConfirm } from './ConfirmActions'

const qs = require('query-string')

class Confirm extends Component {
  componentDidMount() {
    const key = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).key
    this.props.handleInitConfirm()
    // check if there is a url parameter key
    // that is a string to verify email address
    if (key && typeof key === 'string') {
      this.props.handleEmailConfirmation(key)
    }
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
          <p>Deine E-Mail-Adresse wurde erfolgreich verifiziert. <a href="/session">Logge dich ein</a>, um dein Profil anzulegen und zu bearbeiten.</p>
        }
      </section>
    )
  }
}

Confirm.propTypes = {
  confirmState: PropTypes.string,
}

Confirm.defaultProps = {
  confirmState: 'UNKNOWN',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm)
