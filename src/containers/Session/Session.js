import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Session.css'
import { initialiseSession } from './SessionActions'

class Session extends Component {
  componentDidMount() {
    this.props.handleInitSession()
  }

  render() {
    return (
      <div className="Session">
        <p className="Session-intro">
          Session
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitSession: () => {
    dispatch(initialiseSession())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Session)
