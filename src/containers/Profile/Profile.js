import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Profile.css'
import { initialiseProfile } from './ProfileActions'

class Profile extends Component {
  componentDidMount() {
    this.props.handleInitProfile()
  }

  render() {
    return (
      <div className="Profile">
        <p className="Profile-intro">
          Profile
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitProfile: () => {
    dispatch(initialiseProfile())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Profile)
