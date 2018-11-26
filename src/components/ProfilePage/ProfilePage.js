import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { API_URL_UPLOADS } from '../../config/config'
import './ProfilePage.css'

class ProfilePage extends Component {

  render() {
    const { profile } = this.props

    return(
      <div className="profile__container">
        <div className="profile__avatar" style={(profile.avatar !== null && profile.avatar !== '') ? {backgroundImage: `url(${API_URL_UPLOADS}${profile.avatar})`} : {backgroundImage: 'none'}}></div>
        <h1 className="profile__title">{profile.forename} {profile.surname}</h1>
        { profile.bio_short &&
        <p className="profile__subtitle">{profile.bio_short}</p>
        }
        { profile.bio_long &&
        <p>{profile.bio_long}</p>
        }
        { (Array.isArray(profile.tags) && profile.tags.length > 0 && profile.tags[0] !== '') &&
        <div>
          <h3 className="profile__subheadline">Themen, über die {profile.forename} spricht:</h3>
          <ul className="profile__tag-list">
            { profile.tags.map((tag) => (
              <li className="profile__tag" key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        }
        { (Array.isArray(profile.languages) && profile.languages.length > 0 && profile.languages[0] !== '') &&
        <div>
          <h3 className="profile__subheadline">Sprachen:</h3>
          <ul className="profile__tag-list">
            { profile.languages.map((language) => {
              if (language !== '') {
                return (
                  <li className="profile__tag" key={language}>{language}</li>
                )
              }
            })}
          </ul>
        </div>
        }
        { (Array.isArray(profile.podcasts) && profile.podcasts.length > 0 && profile.podcasts[0].name !== '') &&
        <div>
          <h3 className="profile__subheadline">{profile.forename}s Podcasts:</h3>
          <ul className="profile__podcast-list">
            { profile.podcasts.map((podcast) => {
              if (podcast.name !== '') {
                return (
                  <li className="profile__podcast" key={podcast.name}>
                    <img className="profile__podcast__image" alt={`Cover von ${podcast.name}.`} src={"https://ui-avatars.com/api/?name=&background=7797AE&color=FFFFFF&font-size=0.125&size=200&length=100"} />
                    <div className="profile__podcast__text">
                      <p><a href={podcast.url} target="_blank">{podcast.name}</a> · {podcast.description}</p>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        }
        { (Array.isArray(profile.references) && profile.references.length > 0 && profile.references[0].name !== '') &&
        <div>
          <h3 className="profile__subheadline">{profile.forename}s Referenzen:</h3>
          <ul className="profile__reference-list">
            { profile.references.map((reference) => {
              if (reference.title !== '') {
                return (
                  <li className="profile__reference" key={reference.title}>
                    <div className="profile__reference__text">
                      <p><a href={reference.url} target="_blank">{reference.title}</a> · {reference.description}</p>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        }
        <h3 className="profile__subheadline">Dazu kann man mich anfragen:</h3>
        <p className="profile__info-text">
          <span className={profile.talks === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.talks === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich halte Vorträge.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.workshops === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.workshops === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich gebe Workshops/Schulungen.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.remote_possible === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.remote_possible === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich kann remote aufnehmen.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.foreign_language === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.foreign_language === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich nehme auch fremdsprachige Podcasts auf.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.record_outside === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.record_outside === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich nehme auch Podcasts draußen auf.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.guests === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.guests === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich lade auch Gästinnen ein.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.travel === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.travel === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich reise auch um Podcasts aufzuzeichnen.</span>
        </p>
        <p className="profile__info-text">
          <span className={profile.podcast_production === true ? 'profile-page__checkbox profile-page__checkbox--checked' : 'profile-page__checkbox'}></span>
          <span className={profile.podcast_production === true ? 'profile-page__checkbox-label profile-page__checkbox-label--checked' : 'profile-page__checkbox-label'}>Ich kann Podcasts schneiden, aufnehmen und produzieren.</span>
        </p>
        { (profile.city || profile.twitter_url || profile.website_url) &&
        <h3 className="profile__subheadline">Weitere Infos über {profile.forename}:</h3>
        }
        { profile.city &&
        <p className="profile__info-text">Wohnort: {profile.city}
          { profile.country &&
          <span>, {profile.country}</span>
          }
        </p>
        }
        { profile.twitter_url &&
        <p className="profile__info-text"><a href={`https://twitter.com/${profile.twitter_url}`} target="_blank">{profile.forename} auf Twitter</a></p>
        }
        { profile.website_url &&
        <p className="profile__info-text"><a href={profile.website_url} target="_blank">{profile.forename}'s Webseite</a></p>
        }
      </div>
    )
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object,
}

ProfilePage.defaultProps = {
  profile: undefined, 
}

export default ProfilePage