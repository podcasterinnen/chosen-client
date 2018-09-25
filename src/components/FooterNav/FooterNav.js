import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './FooterNav.css'

class FooterNav extends Component {
  render() {
    return(
      <nav className="footernav">
        <ol className="footernav__list">
          <li className="footernav__list__element">
            <Link className="footernav__list__element__link" to="/contact">Kontakt</Link>
          </li>
          <li className="footernav__list__element">
            <Link className="footernav__list__element__link" to="/privacy">Datenschutz</Link>
          </li>
          <li className="footernav__list__element">
            <Link className="footernav__list__element__link" to="/imprint">Impressum</Link>
          </li>
        </ol>
      </nav>
    )
  }
}

export default FooterNav