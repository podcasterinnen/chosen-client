import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Imprint.css'
import { initialiseImprint } from './ImprintActions'

class Imprint extends Component {
  componentDidMount() {
    this.props.handleInitImprint()
  }

  render() {
    return (
      <div className="Imprint">
        <p className="Imprint-intro">
          Imprint
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitImprint: () => {
    dispatch(initialiseImprint())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Imprint)
