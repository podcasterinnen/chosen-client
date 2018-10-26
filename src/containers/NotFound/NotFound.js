import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './NotFound.css'
import { initialiseNotFound } from './NotFoundActions'

class NotFound extends Component {
  componentDidMount() {
    this.props.handleInitNotFound()
  }

  render() {
    return (
      <section className="notfound main__section">
        <h1>Die aufgerufene Seite existiert leider nicht.</h1>
        <p>Die von dir aufgerufene Seite existiert leider nicht. Schreib' uns gerne eine <a href="mailto:contact@podcasterinnen.org">E-Mail</a>, wenn du etwas suchst, das du nicht finden kannst. <NavLink to="/podcasterinnen">Hier</NavLink> findest du alle bei uns eingetragenen Podcasterinnen.</p>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitNotFound: () => {
    dispatch(initialiseNotFound())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(NotFound)
