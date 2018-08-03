import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'normalize.css'
import './App.css'
import { initialiseApp } from './AppActions'

class App extends Component {
  componentDidMount() {
    this.props.handleInitApp()
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__headline">podcasterinnen.org</h1>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitApp: () => {
    dispatch(initialiseApp())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(App)
