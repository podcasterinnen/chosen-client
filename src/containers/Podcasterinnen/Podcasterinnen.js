import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Podcasterinnen.css'
import { initialisePodcasterinnen } from './PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'

class Podcasterinnen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
  }

  handleChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.handleSearch()
        }
      } 
    })
  }

  handleSearch = () => {
    console.log( 'Handling Search', this.state )
  }

  render() {
    const { podcasterinnen } = this.props
    return (
      <div className="Podcasterinnen main__section main__section--wide">
        <h1>Podcasterinnen</h1>
        <form className="podcasterinnen__search">
          <label className="podcasterinnen__search__label">Suche</label>
          <input
            className="podcasterinnen__search__bar"
            ref={input => this.search = input}
            onChange={this.handleChange}
            placeholder="Suche nach ..."
          />
        </form>
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
