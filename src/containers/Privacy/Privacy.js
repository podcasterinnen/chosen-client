import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Privacy.css'
import { initialisePrivacy } from './PrivacyActions'

class Privacy extends Component {
  componentDidMount() {
    this.props.handleInitPrivacy()
  }

  render() {
    return (
      <div className="Privacy">
        <p className="Privacy-intro">
          Privacy
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitPrivacy: () => {
    dispatch(initialisePrivacy())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Privacy)
