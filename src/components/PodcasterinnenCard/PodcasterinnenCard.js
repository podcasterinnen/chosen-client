import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './PodcasterinnenCard.css'

class PodcasterinnenCard extends Component {

  render() {
    const { item } = this.props
    console.log(item)

    return(
      <div className="card">
        <img href="https://api.adorable.io/avatars/285/abott@adorable.png" />
        <p>{item.forename} {item.lastname}</p>
      </div>
    )
  }
}

PodcasterinnenCard.propTypes = {
  item: PropTypes.object,
}

PodcasterinnenCard.defaultProps = {
  item: null,
}

export default PodcasterinnenCard