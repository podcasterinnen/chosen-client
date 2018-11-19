import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Tooltip.css'

class Tooltip extends Component {

  render() {
    const { content } = this.props
    return(
      <span className="tooltip">
        ?
        <span className="tooltip__text">{content}</span>
      </span>
    )
  }
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Tooltip