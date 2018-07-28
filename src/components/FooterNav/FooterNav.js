import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FooterNav extends Component {
  render() {
    return(
      <nav>
        <ol>
          <li><Link to="/contact">Kontakt</Link></li>
          <li><Link to="/privacy">Datenschutz</Link></li>
          <li><Link to="/imprint">Impressum</Link></li>
        </ol>
      </nav>
    )
  }
}

export default FooterNav