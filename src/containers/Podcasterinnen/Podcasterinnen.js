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
    // if(this.props.match.params && this.props.match.params.id === )
    this.props.handleInitPodcasterinnen()
    console.log(this.props, this.state)
  }

  handleChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      this.handleSearch()
    })
  }

  handleSearch = () => {
    const result = []
    this.props.podcasterinnen.forEach((podcasterin) => {
      const podcasterinString = JSON.stringify(podcasterin).toLowerCase()
      const queryString = this.state.query.toLowerCase()
      if (podcasterinString.includes(queryString)) {
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
                <form className="podcasterinnen__search">
                  <label className="podcasterinnen__search__label">Suche</label>
                  <input
                    className="podcasterinnen__search__bar"
                    ref={input => this.search = input}
                    onChange={this.handleChange}
                    placeholder="Suche nach ..."
                    type="text"
                  />
                </form>
                { !podcasterinnen &&
                  <p>
                    Loading...
                  </p>
                }
                { this.state.results.length > 0 &&
                  <div>
                    <h2>Suchergebnisse:</h2>
                    <p><small>{this.state.results.length} Einträge</small></p>
                    <p><button className="button button--decent" onClick={this.handleSearchReset}>Suche zurücksetzen</button></p>
                    <ul className="podcasterinnen__list">
                      { this.state.results.map((result, i) => {
                        return (
                          <li className="podcasterinnen__list__item" key={generateKey(result, i)}>
                            <PodcasterinnenCard item={result}></PodcasterinnenCard>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                }
                { (this.state.results <= 0 && podcasterinnen) &&
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
              </section>
            )
          }}
        />
      </Switch>
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
    .then(() => console.log('Podcasterinnen loaded'))
  }
})

const mapStateToProps = (state) => ({
  podcasterinnen: state.podcasterinnenReducer.podcasterinnen,
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Podcasterinnen))
