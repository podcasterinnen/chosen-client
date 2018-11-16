import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfilePage extends Component {

  render() {
    const { profile } = this.props

    return(
      <div className="profile__container">
      <img className="profile__avatar" alt={`Avatar-Foto von ${profile.forename}.`} src={`https://ui-avatars.com/api/?name=${profile.forename}&background=2C3E50&color=FFFFFF&font-size=0.125&size=200&length=100`} />
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
            { profile.languages.map((language) => (
              <li className="profile__tag" key={language}>{language}</li>
            ))}
          </ul>
        </div>
      }
      { (Array.isArray(profile.podcasts) && profile.podcasts.length > 0 && profile.podcasts[0].name !== '') &&
        <div>
          <h3 className="profile__subheadline">{profile.forename}s Podcasts:</h3>
          <ul className="profile__podcast-list">
            { profile.podcasts.map((podcast) => (
              <li className="profile__podcast" key={podcast.name}>
                <img className="profile__podcast__image" alt={`Avatar-Foto von ${profile.forename}.`} src={`https://ui-avatars.com/api/?name=${podcast.name}&background=7797AE&color=FFFFFF&font-size=0.125&size=200&length=100`} />
                <a href={podcast.url} target="_blank">{podcast.name}</a>
              </li>
            ))}
          </ul>
        </div>
      }
      { profile.remote_possible &&
        <p className="profile__info-text">Remote verfügbar?
          { profile.remote_possible &&
            <span> Ja</span>
          }
          { !profile.remote_possible &&
            <span> Nein</span>
          }
        </p>
      }
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
        <p className="profile__info-text"><a href={profile.twitter_url} target="_blank">{profile.forename} auf Twitter</a></p>
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