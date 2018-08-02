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
      <div className="NotFound">
        <p className="NotFound-intro">
          NotFound
        </p>
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
