import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Contact.css'
import { initialiseContact } from './ContactActions'

class Contact extends Component {
  componentDidMount() {
    this.props.handleInitContact()
  }

  render() {
    return (
      <div className="Contact">
        <p className="Contact-intro">
          Contact
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitContact: () => {
    dispatch(initialiseContact())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Contact)
