import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Route } from 'react-router-dom'

import './PodcasterinnenCard.css'

class PodcasterinnenCard extends Component {

  render() {
    const { item, match } = this.props

    return(
      <div className="card">
        <img className="card__avatar" alt={`Avatar-Foto von ${item.forename}.`} src={`https://ui-avatars.com/api/?name=${item.forename}&background=2C3E50&color=FFFFFF&font-size=0.125&size=200&length=100`} />
        <div className="card__text">
          <p>{item.forename} {item.lastname}</p>
          { item.bio_short &&
            <p className="card__bio">{item.bio_short}</p>
          }
          { (item.city || item.country) &&
            <p className="card__address">
              {/* Show city and comma only if city exists. */}
              { item.city && 
                <span>{item.city}, </span>
              }
              {item.country}
            </p>
          }
          { item.podcasts &&
            <ul className="card__list">
              { item.podcasts.map((podcast) => {
                  return (
                    <li className="card__list__item" key={podcast}><a href={podcast.url}>{podcast.name}</a></li>
                  )
                })
              }
            </ul>
          }
          { item.tags &&
            <ul className="card__list">
              { item.tags.map((tag) => {
                  return (
                    <li className="card__list__item" key={tag}>{tag.name}</li>
                  )
                })
              }
            </ul>
          }
          <Link to={`${match.url}/${item.id}`}>Mehr über {item.forename}</Link>
        </div>
      </div>
    )
  }
}

PodcasterinnenCard.propTypes = {
  item: PropTypes.object,
}

PodcasterinnenCard.defaultProps = {
  item: null,
}

export default withRouter(PodcasterinnenCard)