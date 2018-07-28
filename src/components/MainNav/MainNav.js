import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainNav extends Component {
  render() {
    return(
      <nav>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/podcasterinnen">Podcasterinnen</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/about">Über uns</Link></li>
          <li><Link to="/session">Login/Register</Link></li>
        </ol>
      </nav>
    )
  }
}

export default MainNav