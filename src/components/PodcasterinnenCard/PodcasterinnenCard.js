import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import './PodcasterinnenCard.css'

class PodcasterinnenCard extends Component {

  render() {
    const { item, match } = this.props

    return(
      <div className="card">
        <img className="card__avatar" alt={`Avatar-Foto von ${item.forename}.`} src={`https://ui-avatars.com/api/?name=${item.forename}&background=2C3E50&color=FFFFFF&font-size=0.125&size=200&length=100`} />
        <div className="card__text">
          <h3 className="card__title">{item.forename} {item.surname}</h3>
          { item.bio_short &&
            <p className="card__bio">{item.bio_short}</p>
          }
          { item.podcasts &&
            <div>
              <p className="card__subtitle">{item.forename}s Podcasts:</p>
              <ul className="card__list">
                { item.podcasts.map((podcast) => {
                  return (
                    <li className="card__list__item" key={podcast.name}>{podcast.name}</li>
                  )
                }) }
              </ul>
            </div>
          }
          { item.tags &&
            <div>
              <p className="card__subtitle">Themen, über die {item.forename} spricht:</p>
              <ul className="card__list">
                { item.tags.map((tag) => {
                  return (
                    <li className="card__list__item" key={tag}>{tag}</li>
                  )
                }) }
              </ul>
            </div>
          }
          <Link className="card__link" to={`${match.url}/${item.id}`}>Mehr über {item.forename}</Link>
        </div>
      </div>
    )
  }
}

PodcasterinnenCard.propTypes = {
  item: PropTypes.object,
  match: PropTypes.object.isRequired,
}

PodcasterinnenCard.defaultProps = {
  item: null,
}

export default withRouter(PodcasterinnenCard)