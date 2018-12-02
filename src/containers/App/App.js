import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './App.css'

class App extends Component {

  render() {
    return (
      <section className="app main__section">
        <h1 className="title app__headline">podcasterinnen.org</h1>
        <p className="subtitle">Nicht-binäre Podcastende und Technik. Podcasterinnen und Inhalte. Podcasterinnen und nicht-binäre Podcastende hinter dem Mikro und auf der Bühne.</p>
        <Link className="button button--cta app__button" to="/session">Mitmachen</Link>
        <p>Podcasterinnen und nicht-binäre Podcastende gibt es viel, doch leider sind sie selten zu Gast auf Bühnen, in Podcasts oder bei Workshops. <br/>Du bist Podcaster:in und suchst für ein Thema eine Gästin? Du bist Veranstalter:in und suchst nicht-binäre Podcastende oder eine Podcasterin für einen Vortrag oder ein Workshop? Bestimmt findest du sie hier:</p>
      </section>
    )
  }
}



export default withRouter(App)
