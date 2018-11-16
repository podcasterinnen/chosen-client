import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import './App.css'
import { initialiseApp } from './AppActions'

class App extends Component {
  componentDidMount() {
    this.props.handleInitApp()
  }

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

const mapDispatchToProps = (dispatch) => ({
  handleInitApp: () => {
    dispatch(initialiseApp())
  }
})


export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
