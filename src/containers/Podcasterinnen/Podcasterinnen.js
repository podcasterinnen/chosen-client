import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Creatable from 'react-select/lib/Creatable'
import makeAnimated from 'react-select/lib/animated'

import './Podcasterinnen.css'
import Profile from '../Profile/Profile'
import { initialisePodcasterinnen } from './PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'
import staticTags from '../../assets/data/tags.json'

/**
 * Center text of creatable vertically
 */
const styles = {
  creatable: {
    control: (provided) => ({
      ...provided,
      '&:hover': { border: '1px solid #7797AE' },
      border: '1px solid lightgray',
      boxShadow: 'none',
    }),
    input: (provided) => ({
      ...provided,
      marginTop: 12,
      height: 44,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      '&:hover': {
        backgroundColor: '#E9C5D7',
        color: '#7797AE',
      },
    }),
    option: (provided) => ({
      ...provided,
      '&:hover': {
        backgroundColor: '#7797AE',
        color: 'white',
        cursor: 'pointer',
      },
    }),
  }
}

class Podcasterinnen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false,
      options: [],
      query: '',
      results: [],
      shuffledPodcasterinnen: [],
      sortValue: 'random',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
    this.initCreatables()
    if (this.props.location.pathname === '/podcasterinnen') {
      document.title = `Profile – podcasterinnen.org`
    }

    if (this.props.location.state && this.props.location.state.query) {
      this.handleChange(this.props.location.state.query)
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (
      nextProps.podcasterinnen !== this.props.podcasterinnen ||
      nextState.sortValue !== this.state.sortValue ||
      nextState.query !== this.state.query
      ) {
      let sourceArray = nextProps.podcasterinnen
      let result = []
      if (nextState.results.length > 0) {
        sourceArray = nextState.results
      }
      switch (nextState.sortValue) {
      case 'alphabet':
        result = sourceArray.sort((a, b) => {
          if (a.forename > b.forename) { return 1 }
          if (a.forename < b.forename) { return -1 }
          return 0
        })
        break
      case 'newest':
        result = sourceArray.sort((a, b) => {
          if (a.date_created > b.date_created) { return -1 }
          if (a.date_created < b.date_created) { return 1 }
          return 0
        })
        break
      case 'random':
        result = sourceArray.sort(() => Math.random() - 0.5)
        break
      }
      this.setState({
        results: result,
      })
    }
  }

  handleChange = (selectedOption) => {
    this.setState({
      isSearching: true,
      query: selectedOption
    }, () => {
      this.handleSearch()
      if (selectedOption.length === 0) {
        this.setState({ isSearching: false })
      }
    })
  }

  handleSearch = () => {
    if (this.state.query.length > 0) {
      const result = []
      this.props.podcasterinnen.forEach((podcasterin) => {
        const podcasterinString = JSON.stringify(podcasterin).toLowerCase()
        let isResult = false
        this.state.query.forEach((query) => {
          const queryString = query.value.toLowerCase()
          if (!isResult && podcasterinString.includes(queryString) && podcasterin.profile_state === 'PUBLISHED') {
            result.push(podcasterin)
            isResult = true
          }
        })
      })
      this.setState({
        results: result,
      })
    }
  }

  handleSortChange = (event) => {
    this.setState({
      sortValue: event.target.value,
    })
  }

  initCreatables = () => {
    let options = []
    for (const tag of staticTags.tags) {
      options.push({
        label: tag,
        value: tag,
      })
    }
    this.setState({ options: options })
  }

  render() {
    const { match, podcasterinnen } = this.props
    const { isSearching, options, query, results, sortValue } = this.state
    
    return(
      <Switch>
        <Route path={`${match.path}/:id`} component={Profile} />
        <Route
          exact
          props={match.path}
          render={() => {
            return (
              <section className="Podcasterinnen main__section main__section--wide">
                <form role="search" className="podcasterinnen__search">
                  <label>Suche</label>
                  <Creatable
                    className="podcasterinnen__search__bar"
                    components={makeAnimated()}
                    formatCreateLabel={(inputValue) => ('Suche nach ' + inputValue)}
                    isMulti={true}
                    ref={input => this.search = input}
                    onChange={this.handleChange}
                    placeholder="Suche nach ..."
                    options={options}
                    styles={styles.creatable}
                    value={query}
                  />
                  <label
                  className="podcasterinnen__sort__label">Anordnen nach:</label>
                  <select onChange={this.handleSortChange} value={sortValue} className="podcasterinnen_sort__select">
                    <option value="random">Zufällig</option>
                    <option value="newest">Neueste zuerst</option>
                    <option value="alphabet">A-Z</option>
                  </select>
                </form>
                { !podcasterinnen &&
                  <p>
                    Loading...
                  </p>
                }
                { results.length > 0 &&
                  <div>
                    { isSearching &&
                    <div>
                      <p className="podcasterinnnen__search__result-label"><small>{results.length} Einträge</small></p>
                      <h2>
                        Passende Profile:
                      </h2>
                    </div>
                    }
                    <ul className="podcasterinnen__list">
                      { results.map((result, i) => {
                        if (result.profile_state === 'PUBLISHED') {
                          return (
                            <li className="podcasterinnen__list__item" key={generateKey(result, i)}>
                              <PodcasterinnenCard 
                                handleClick={(query) => this.handleChange(query)}
                                item={result}
                              ></PodcasterinnenCard>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
                }
                { (isSearching && results <= 0) &&
                  <p>Keine passenden Profile gefunden.</p>
                }
                {/* { (!isSearching && shuffledPodcasterinnen) &&
                  <ul className="podcasterinnen__list">
                    { shuffledPodcasterinnen.map((podcasterin, i) => {
                      if (podcasterin.profile_state === 'PUBLISHED') {
                        return (
                          <li className="podcasterinnen__list__item" key={generateKey(podcasterin.forename, i)}>
                            <PodcasterinnenCard 
                              handleClick={(query) => this.handleChange(query)}
                              item={podcasterin}
                            ></PodcasterinnenCard>
                          </li>
                        )
                      }
                    })}
                  </ul>
                } */}
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
  match: PropTypes.object,
  podcasterinnen: PropTypes.array,
}

Podcasterinnen.defaultProps = {
  handleInitPodcasterinnen: undefined,
  match: undefined,
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
  mapDispatchToProps,
)(Podcasterinnen))
