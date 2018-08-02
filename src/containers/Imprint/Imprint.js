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
      <section className="imprint">
        <h1 className="imprint__headline">
          Imprint
        </h1>
      </section>
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
