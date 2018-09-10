import React, { Component } from 'react'
import { connect } from 'react-redux'

import './NotFound.css'
import { initialiseNotFound } from './NotFoundActions'

class NotFound extends Component {
  componentDidMount() {
    this.props.handleInitNotFound()
  }

  render() {
    return (
      <div className="notfound main__section">
        <h1>404</h1>
      </div>
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
