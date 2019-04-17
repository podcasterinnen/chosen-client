import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Creatable from 'react-select/lib/Creatable'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import querySearch from 'stringquery'

import './Podcasterinnen.css'
import Profile from '../Profile/Profile'
import { initialisePodcasterinnen } from './PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'
import staticTags from '../../assets/data/tags.json'

/**
 * Options for Search Filter
 */
const filterOptions = [
  {
    value: 'talks',
    label: 'Ich halte Vorträge.',
  }, 
  {
    value: 'workshops',
    label: 'Ich gebe Workshops/Schulungen.',
  }, 
  {
    value: 'remote_possible',
    label: 'Ich kann remote aufnehmen.',
  }, 
  {
    value: 'foreign_language',
    label: 'Ich nehme auch fremdsprachige Podcasts auf.',
  }, 
  {
    value: 'record_outside',
    label: 'Ich nehme auch Podcasts draußen auf.',
  }, 
  {
    value: 'guests',
    label: 'Ich lade auch Gästinnen ein.',
  }, 
  {
    value: 'travel',
    label: 'Ich reise auch um Podcasts aufzuzeichnen.',
  }, 
  {
    value: 'podcast_production',
    label: 'Ich kann Podcasts schneiden, aufnehmen und produzieren.',
  },
]

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
      filter: '',
      options: [],
      query: '',
      results: [],
      shuffledPodcasterinnen: [],
      sortValue: 'random',
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeParameter = this.changeParameter.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
    this.initCreatables()
    if (this.props.location.pathname === '/podcasterinnen') {
      document.title = `Profile – podcasterinnen.org`
    }
  }

  handleParameterChange = (searchString) => {
    if (this.props.podcasterinnen) {
      const result = []
      // Filter Variables
      let filterQueryArray = []
      const filterParameter = querySearch(searchString, { ignoreQueryPrefix: true }).filter
      const filterParamters = filterParameter ? filterParameter.split(';') : []
      const uniqueFilterParameters = [ ...new Set(filterParamters) ]
      // Search Variables
      let searchQueryArray = []
      const searchParameter = querySearch(searchString, { ignoreQueryPrefix: true }).search
      const searchParameters = searchParameter ? searchParameter.split(';') : []
      const uniqueSearchParameters = [ ...new Set(searchParameters) ]

      if (uniqueSearchParameters.length > 0 || uniqueFilterParameters.length > 0) {
        this.props.podcasterinnen.forEach((podcasterin) => {
          const podcasterinString = JSON.stringify(podcasterin).toLowerCase()
          if (uniqueSearchParameters.length > 0) {
            uniqueSearchParameters.forEach((query) => {
              let isResult = false
              const queryString = query.toLowerCase()
              const queryUnescaped = unescape(query)
              const queryCapitalized = queryUnescaped.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
              if (!isResult && podcasterinString.includes(queryString) && podcasterin.profile_state === 'PUBLISHED') {
                result.push(podcasterin)
                isResult = true
              }
              searchQueryArray.push({
                label: queryCapitalized,
                value: query,
              })
            })
          }
          if (uniqueFilterParameters.length > 0) {
            uniqueFilterParameters.forEach((query) => {
              let isResult = false
              const queryString = `"${query.toLowerCase()}":true`
              const queryUnescaped = unescape(query)
              const queryCapitalized = queryUnescaped.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
              if (!isResult && podcasterinString.includes(queryString) && podcasterin.profile_state === 'PUBLISHED') {
                result.push(podcasterin)
                isResult = true
              }
              filterQueryArray.push({
                label: queryCapitalized,
                value: query,
              })
            })
          }
        })
        this.setState({
          isSearching: true,
          results: result,
        })
      } else {
        this.setState({
          results: this.props.podcasterinnen,
        })
      }

      if (!this.state.query && searchQueryArray.length > 0) {
        this.setState({
          query: this.getUnique(searchQueryArray),
        })
      }

      if (!this.state.filter && filterQueryArray.length > 0) {
        this.setState({
          filter: this.getUnique(filterQueryArray),
        })
      }
    }
  }

  getUnique = (arr, comp) => (
    arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e])
  )

  componentDidUpdate = (prevProps, prevState) => {
    if (
      (prevProps.podcasterinnen !== this.props.podcasterinnen || prevProps.location.search !== this.props.location.search) &&
      this.props.podcasterinnen.length > 0
    ) {
      this.handleParameterChange(this.props.location.search)
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (
      nextProps.podcasterinnen !== this.props.podcasterinnen ||
      nextState.sortValue !== this.state.sortValue ||
      nextState.query !== this.state.query ||
      nextProps.location.search !== this.props.location.search
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
      default:
        return
      }
      this.setState({
        results: result,
      })
    }
  }

  handleChange = (selectedOption) => {
    const uniqueSelectedOption = [...new Set(selectedOption.map(({value}) => value))].map(e => selectedOption.find(({value}) => value === e))
    this.setState({
      isSearching: true,
      query: uniqueSelectedOption
    }, () => {
      this.changeParameter()
      if (uniqueSelectedOption.length === 0) {
        this.setState({ isSearching: false })
      }
    })
  }

  handleFilter = (selectedOption) => {
    const uniqueSelectedOption = [...new Set(selectedOption.map(({value}) => value))].map(e => selectedOption.find(({value}) => value === e))
    this.setState({
      isSearching: true,
      filter: uniqueSelectedOption
    }, () => {
      this.changeParameter()
      if (uniqueSelectedOption.length === 0) {
        this.setState({ isSearching: false })
      }
    })
  }

  changeParameter = () => {
    let paramterString = ''
    // Only searching
    if (this.state.query.length > 0 && !this.state.filter.length > 0) {
      this.state.query.forEach((query, index) => {
        const queryString = query.value.toLowerCase()
        if (index === 0) {
          paramterString = `?search=${queryString}`
        } else {
          paramterString = `${paramterString};${queryString}`
        }
      })
      this.props.history.push(paramterString)
    // Only filtering
    } else if (!this.state.query.length > 0 && this.state.filter.length > 0) {
      this.state.filter.forEach((filter, index) => {
        const filterString = filter.value.toLowerCase()
        if (index === 0) {
          paramterString = `?filter=${filterString}`
        } else {
          paramterString = `${paramterString};${filterString}`
        }
      })
      this.props.history.push(paramterString)

    // Filtering and searching
    } else if (this.state.query.length > 0 && this.state.filter.length > 0) {
      this.state.query.forEach((query, index) => {
        const queryString = query.value.toLowerCase()
        if (index === 0) {
          paramterString = `?search=${queryString}`
        } else {
          paramterString = `${paramterString};${queryString}`
        }
      })
      this.state.filter.forEach((filter, index) => {
        const filterString = filter.value.toLowerCase()
        if (index === 0) {
          paramterString = `${paramterString}&filter=${filterString}`
        } else {
          paramterString = `${paramterString};${filterString}`
        }
      })
      this.props.history.push(paramterString)
    }  else {
      this.props.history.push({
        pathname: '/podcasterinnen',
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
    const { isSearching, options, query, results, sortValue, filter } = this.state
    
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
                  <label className="podcasterinnen__search__label">Suche</label>
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
                  <label className="podcasterinnen__search__label">Filter</label>
                  <Select
                    isMulti
                    onChange={this.handleFilter}
                    options={filterOptions}
                    styles={styles.creatable}
                    value={filter}
                  />
                  <div className="podcasterinnen__search__features">
                    <div className="podcasterinnen__sort">
                      <label className="podcasterinnen__sort__label">Anordnen nach:</label>
                      <select onChange={this.handleSortChange} value={sortValue} className="podcasterinnen_sort__select">
                        <option value="random">Zufällig</option>
                        <option value="newest">Neueste zuerst</option>
                        <option value="alphabet">A-Z</option>
                      </select>
                    </div>
                  </div>
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
                      {/* TODO: results should only be published accounts */}
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
                        return false
                      })}
                    </ul>
                  </div>
                }
                { (isSearching && results <= 0) &&
                  <p>Keine passenden Profile gefunden.</p>
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
