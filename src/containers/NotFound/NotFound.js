import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './NotFound.css'

class NotFound extends Component {

  render() {
    return (
      <section className="notfound main__section">
        <h1>Die aufgerufene Seite existiert leider nicht.</h1>
        <p>Die von dir aufgerufene Seite existiert leider nicht. Schreib' uns gerne eine <a href="mailto:contact@podcasterinnen.org">E-Mail</a>, wenn du etwas suchst, das du nicht finden kannst. <NavLink to="/podcasterinnen">Hier</NavLink> findest du alle bei uns eingetragenen Podcasterinnen.</p>
      </section>
    )
  }
}


export default NotFound
