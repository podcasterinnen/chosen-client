import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Podcasterinnen.css'
import { initialisePodcasterinnen } from './PodcasterinnenActions'

class Podcasterinnen extends Component {
  componentDidMount() {
    this.props.handleInitPodcasterinnen()
  }

  render() {
    return (
      <div className="Podcasterinnen">
        <p className="Podcasterinnen-intro">
          Podcasterinnen
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitPodcasterinnen: () => {
    dispatch(initialisePodcasterinnen())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Podcasterinnen)
