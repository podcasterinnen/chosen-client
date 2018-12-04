import React, { Component } from 'react'

import './CookieConsent.css'

class CookieConsent extends Component {
  render() {
    return(
      <div className="cookieconsent">
        <p className="cookieconstent__copy">podcasterinnen.org verwendet Cookies, um die Profil-Daten aus unserer Datenbank zu laden.</p>
        <button className="button cookieconsent__button">Akzeptieren</button>
      </div>
    )
  }
}

export default CookieConsent