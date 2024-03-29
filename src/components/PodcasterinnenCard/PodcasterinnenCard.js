import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import { API_URL_UPLOADS } from '../../config/config'
import './PodcasterinnenCard.css'

class PodcasterinnenCard extends Component {

  render() {
    const { handleClick, item } = this.props

    return(
      <div className="card">
        <Link className="card__link" to={{ pathname: `podcasterinnen/${item.forename.replace(/\s+/g, '-').toLowerCase()}-${item.podcasts[0].name.replace(/–|-/g, ' ').replace(/\s+/g, '-').toLowerCase()}`, state: { id: item.id }}}>
          <div className="card__avatar" style={(item.avatar !== null && item.avatar !== '') ? {backgroundImage: `url(${API_URL_UPLOADS}${item.avatar})`} : {backgroundImage: 'none'}}></div>
        </Link>
        <div className="card__text">
          { item.pronouns && item.pronouns.length > 0 ?
            <div className="card__pronouns">
              { item.pronouns.map((pronoun, i) => 
                <p key={i} className="card__pronouns__text">
                  <span>{pronoun}</span>
                  { i < item.pronouns.length - 1 ?
                    <span>/</span> : null
                  }
                </p>
              )}
            </div> : null
          }
          <h3 className="card__title">{item.forename} {item.surname}</h3>
          { item.bio_short &&
            <p className="card__bio">{item.bio_short}</p>
          }
          { item.podcasts &&
            <div>
              <p className="card__subtitle">{item.forename}s Podcasts:</p>
              <ul className="card__list">
                { item.podcasts.map((podcast) => {
                  if (podcast.name !== '') {
                    return (
                      <li className="card__list__item" key={podcast.name}>{podcast.name}</li>
                    )
                  }
                  return false
                }) }
              </ul>
            </div>
          }
          { (Array.isArray(item.tags) && item.tags.length > 0 && item.tags[0] !== '') &&
            <div>
              <p className="card__subtitle">Themen, über die {item.forename} spricht:</p>
              <ul className="card__list">
                { item.tags.map((tag) => {
                  if (tag !== '') {
                    return (
                      <li
                        className="card__list__item card__list__item--link"
                        key={tag}
                        onClick={() => handleClick([{
                          label: tag,
                          value: tag,
                        }])}
                      >{tag}</li>
                    )
                  }
                  return false
                }) }
              </ul>
            </div>
          }
          <Link className="card__link" to={{ pathname: `podcasterinnen/${item.forename.replace(/\s+/g, '-').toLowerCase()}-${item.podcasts[0].name.replace(/–|-/g, ' ').replace(/\s+/g, '-').toLowerCase()}`, state: { id: item.id }}}>Mehr über {item.forename}</Link>
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