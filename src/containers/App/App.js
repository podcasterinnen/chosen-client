import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './App.css'

class App extends Component {

  render() {
    return (
      <section className="app main__section">
        <h1 className="title app__headline">podcasterinnen.org</h1>
        <p className="subtitle">Frauen und Technik. Frauen und Inhalte. Frauen hinter dem Mikro und auf der Bühne.</p>
        <Link className="button button--cta app__button" to="/session">Mitmachen</Link>
      </section>
    )
  }
}



export default withRouter(App)
