import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Podcasterinnen.css'
import { initialisePodcasterinnen } from './PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'

class Podcasterinnen extends Component {
  componentDidMount() {
    this.props.handleInitPodcasterinnen()
  }

  render() {
    const { podcasterinnen } = this.props
    return (
      <div className="Podcasterinnen main__section">
        <h1>Podcasterinnen</h1>
        { !podcasterinnen &&
          <p>
            Loading...
          </p>
        }
        { podcasterinnen &&
          <ul className="podcasterinnen__list">
            { podcasterinnen.map((podcasterin, i) => {
              return (
                <li className="podcasterinnen__list__item" key={generateKey(podcasterin.forename, i)}>
                  <PodcasterinnenCard item={podcasterin}></PodcasterinnenCard>
                </li>
              )
            })}
          </ul>
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
