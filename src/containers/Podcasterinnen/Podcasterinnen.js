import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

import './Podcasterinnen.css'
import Profile from '../Profile/Profile'
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
    this.handleSearchReset = this.handleSearchReset.bind(this)
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
  }

  handleChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      this.handleSearch()
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleSearch = () => {
    const result = []
    this.props.podcasterinnen.forEach((podcasterin) => {
      const podcasterinString = JSON.stringify(podcasterin).toLowerCase()
      const queryString = this.state.query.toLowerCase()
      if (podcasterinString.includes(queryString) && podcasterin.profile_state === 'PUBLISHED') {
        result.push(podcasterin)
      }
    })
    this.setState({
      results: result,
    })
  }

  handleSearchReset = () => {
    this.setState({
      query: '',
      results: [],
    })
  }

  render() {
    const { match, podcasterinnen } = this.props
    const { query } = this.state
    
    return(
      <Switch>
        <Route path={`${match.path}/:id`} component={Profile} />
        <Route
          exact
          props={match.path}
          render={() => {
            return (
              <section className="Podcasterinnen main__section main__section--wide">
                <h1>Podcasterinnen</h1>
                <form className="podcasterinnen__search" onSubmit={(e) => this.handleSubmit(e)}>
                  <label className="podcasterinnen__search__label">Suche</label>
                  <input
                    className="podcasterinnen__search__bar"
                    ref={input => this.search = input}
                    onChange={this.handleChange}
                    placeholder="Suche nach ..."
                    type="text"
                    value={query}
                  />
                </form>
                { !podcasterinnen &&
                  <p>
                    Loading...
                  </p>
                }
                { this.state.results.length > 0 &&
                  <div>
                    <h2>Suchergebnisse für "{query}":</h2>
                    <p><small>{this.state.results.length} Einträge</small></p>
                    <p><button className="button button--decent" onClick={this.handleSearchReset}>Suche zurücksetzen</button></p>
                    <ul className="podcasterinnen__list">
                      { this.state.results.map((result, i) => {
                        if (result.profile_state === 'PUBLISHED') {
                          return (
                            <li className="podcasterinnen__list__item" key={generateKey(result, i)}>
                              <PodcasterinnenCard item={result}></PodcasterinnenCard>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
                }
                { (this.state.results <= 0 && podcasterinnen) &&
                  <ul className="podcasterinnen__list">
                    { podcasterinnen.map((podcasterin, i) => {
                      if (podcasterin.profile_state === 'PUBLISHED') {
                        return (
                          <li className="podcasterinnen__list__item" key={generateKey(podcasterin.forename, i)}>
                            <PodcasterinnenCard item={podcasterin}></PodcasterinnenCard>
                          </li>
                        )
                      }
                    })}
                  </ul>
                }
              </section>
            )
          }}
        />
      </Switch>
    )
  }
}

Podcasterinnen.propTypes = {
  handleInitPodcasterinnen: PropTypes.func,
  podcasterinnen: PropTypes.array,
}

Podcasterinnen.defaultProps = {
  handleInitPodcasterinnen: undefined,
  podcasterinnen: null,
}

const mapDispatchToProps = (dispatch) => ({
  handleInitPodcasterinnen: () => {
    dispatch(initialisePodcasterinnen())
  }
})

const mapStateToProps = (state) => ({
  podcasterinnen: state.podcasterinnenReducer.podcasterinnen,
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Podcasterinnen))
