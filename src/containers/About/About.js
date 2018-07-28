import React, { Component } from 'react'
import { connect } from 'react-redux'

import './About.css'
import { initialiseAbout } from './AboutActions'

class About extends Component {
  componentDidMount() {
    this.props.handleInitAbout()
  }

  render() {
    return (
      <div className="About">
        <p className="About-intro">
          About
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitAbout: () => {
    dispatch(initialiseAbout())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(About)
