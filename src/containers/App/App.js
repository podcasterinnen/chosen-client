import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import './App.css'
import { initialisePodcasterinnen } from '../Podcasterinnen/PodcasterinnenActions'
import PodcasterinnenCard from '../../components/PodcasterinnenCard/PodcasterinnenCard'
import { generateKey } from '../../utils/utils'

class App extends Component {
  componentDidMount = () => {
    this.props.handleInitPodcasterinnen()
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

    return (
      <div>
        <section className="app-cta main__section">
          <h1 className="title app__headline">podcasterinnen.org</h1>
          <p className="subtitle app__subtitle">Nicht-binäre Podcastende und Technik. Podcasterinnen und Inhalte. Podcasterinnen und nicht-binäre Podcastende hinter dem Mikro und auf der Bühne.</p>
          <p className="app__cta"><Link className="button button--cta app__button" to="/session">Mitmachen</Link></p>
          <p className="app-cta__text">Podcasterinnen und nicht-binäre Podcastende gibt es viel, doch leider sind sie selten zu Gast auf Bühnen, in Podcasts oder bei Workshops. Du bist Podcaster:in und suchst für ein Thema eine Gästin? Du bist Veranstalter:in und suchst nicht-binäre Podcastende oder eine Podcasterin für einen Vortrag oder ein Workshop? Bestimmt findest du sie hier.</p>
        </section>
        <section className="app-copy">
          { podcasterinnen &&
          <div>
            <h2>Neueste Podcasterinnen-Profile:</h2>
            <ul className="podcasterinnen__list">
              { podcasterinnen.sort(this.sortPodcasterinnen).map((podcasterin, i) => {
                if (podcasterin.profile_state === 'PUBLISHED' && i < 4) {
                  return (
                    <li className="podcasterinnen__list__item" key={generateKey(podcasterin.forename, i)}>
                      <PodcasterinnenCard item={podcasterin}></PodcasterinnenCard>
                    </li>
                  )
                }
              })}
            </ul>
            <p className="app__cta"><Link className="button button--cta app__button" to="/podcasterinnen">Weitere Podcasterinnen</Link></p>
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
