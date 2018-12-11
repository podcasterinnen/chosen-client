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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
    this.initCreatables()
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

  initCreatables = () => {
    let options = []
    for (const tag of staticTags.tags) {
      options.push({
        label: tag,
        value: this.toCamelCase(tag),
      })
    }
    this.setState({ options: options })
  }

  toCamelCase = (sentenceCase) => {
    var out = ''
    sentenceCase.split(' ').forEach(function (el, idx) {
      var add = el.toLowerCase()
      out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1))
    })
    return out
  }

  render() {
    const { match, podcasterinnen } = this.props
    const { isSearching, options, query } = this.state
    
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
                </form>
                { !podcasterinnen &&
                  <p>
                    Loading...
                  </p>
                }
                { this.state.results.length > 0 &&
                  <div>
                    <p className="podcasterinnnen__search__result-label"><small>{this.state.results.length} Einträge</small></p>
                    <h2>
                      Passende Profile:
                    </h2>
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
                { (isSearching && this.state.results <= 0) &&
                  <p>Keine passenden Profile gefunden.</p>
                }
                { (!isSearching && podcasterinnen) &&
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
