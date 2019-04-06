import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'

import './App.css'
import { initialisePodcasterinnen } from '../Podcasterinnen/PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagQuery: null,
      toPodcasterinnen: false,
    }
  }

  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
    document.title = 'podcasterinnen.org'
  }

  handleTagSearch = (query) => {
    this.setState({ 
      tagQuery: query,
      toPodcasterinnen: true,
    })
  }

  sortPodcasterinnen = (a, b) => {
    if (a.date_created < b.date_created)
      return 1
    if (a.date_created > b.date_created)
      return -1
    return 0
  }

  render() {
    const { podcasterinnen } = this.props
    const { toPodcasterinnen, tagQuery } = this.state
    let count = 0

    if (toPodcasterinnen) {
      return <Redirect to={{ pathname: '/podcasterinnen', state: { query: tagQuery }}}></Redirect>
    }

    return (
      <div className="app">
        <div className="app__ball app__ball--top"></div>
        <div className="app__ball app__ball--bottom"></div>
        <section className="app-cta main__section">
          <h1 className="title app__headline">podcasterinnen.org</h1>
          <h2 className="title--small app__headline--small">Podcasterinnen und nicht-binäre Podcastpersonen hinter dem Mikro und auf der Bühne.</h2>
          <p className="subtitle app__subtitle">Du bist Podcasterin? Eine nicht-binäre Podcastperson? Du machst einen eigenen Podcast, besitzt Expertise zu einem besonderen Thema? Dann bist du hier richtig. Wir möchten mit podcasterinnen.org zeigen, wie vielfältig Podcasts sind.</p>
          <p className="app__cta"><Link className="button button--cta app__button" to="/session">Mitmachen</Link></p>
          <p className="app-cta__text">Podcasterinnen und nicht-binäre Podcastpersonen gibt es viele, doch leider sind sie selten zu Gast auf Bühnen, in Podcasts oder bei Workshops. Du bist Podcaster:in und suchst für ein Thema eine Podcastperson? Du bist Veranstalter:in und suchst nicht-binäre Podcastende oder eine Podcasterin für einen Vortrag oder einen Workshop? Bestimmt findest du sie hier.</p>
        </section>
        <section className="app-copy main__section main__section--wide">
          { podcasterinnen &&
          <div>
            <h2>Neueste Profile:</h2>
            <ul className="podcasterinnen__list">
              { podcasterinnen.sort(this.sortPodcasterinnen).map((podcasterin, i) => {
                // Show only 4 newest profiles
                if (count < 3 && podcasterin.profile_state === 'PUBLISHED') {
                  count += 1
                  return (
                    <li className="podcasterinnen__list__item" key={generateKey(podcasterin.forename, i)}>
                      <PodcasterinnenCard 
                        handleClick={(query) => this.handleTagSearch(query)}
                        item={podcasterin}
                      ></PodcasterinnenCard>
                    </li>
                  )
                }
                return false
              })}
            </ul>
            <p className="app__cta"><Link className="button button--cta app__button" to="/podcasterinnen">Weitere Profile</Link></p>
          </div>
          }
        </section>
      </div>
    )
  }
}

App.propTypes = {
  handleInitPodcasterinnen: PropTypes.func,
  podcasterinnen: PropTypes.array,
}

App.defaultProps = {
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
  mapDispatchToProps,
)(App))
