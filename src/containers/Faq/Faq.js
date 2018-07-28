import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Faq.css'
import { initialiseFaq } from './FaqActions'

class Faq extends Component {
  componentDidMount() {
    this.props.handleInitFaq()
  }

  render() {
    return (
      <div className="Faq">
        <p className="Faq-intro">
          Faq
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitFaq: () => {
    dispatch(initialiseFaq())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Faq)
