import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Podcasterinnen.css'
import { initialisePodcasterinnen } from './PodcasterinnenActions'

class Podcasterinnen extends Component {
  componentDidMount() {
    this.props.handleInitPodcasterinnen()
  }

  render() {
    const { podcasterinnen } = this.props
    return (
      <div className="Podcasterinnen">
        <p className="Podcasterinnen-intro">
          Podcasterinnen
        </p>
        {!podcasterinnen &&
          <p>
            Loading...
          </p>
        }
        {podcasterinnen &&
          <p>
            Podcasterinnen loaded.
          </p>
        }
      </div>
    )
  }
}

Podcasterinnen.propTypes = {
  podcasterinnen: PropTypes.array,
}

Podcasterinnen.defaultProps = {
  podcasterinnen: null,
}

const mapDispatchToProps = (dispatch) => ({
  handleInitPodcasterinnen: () => {
    dispatch(initialisePodcasterinnen())
    .then(() => console.log('Podcasterinnen Loaded'))
  }
})

const mapStateToProps = (state) => ({
  podcasterinnen: state.podcasterinnenReducer.podcasterinnen,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Podcasterinnen)
