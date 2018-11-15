import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import staticTags from '../../assets/data/tags.json'

import './Profile.css'
import { submitProfile, editingProfile, editingQuit, initialiseProfile } from './ProfileActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bioShortCharactersRemaining: 255,
      isEditable: false,
      profile: {
        bioShort: '',
        bioLong: '',
        city: '',
        country: '',
        forename: '',
        languages: [''],
        podcasts: [{
          name: '',
          url: '',
        }],
        references: [{
          title: '',
          url: '',
        }],
        remote_possible: false,
        surname: '',
        tags: [''],
        twitter_url: '',
        website_url: '',
      },
      staticTags: staticTags.tags,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const match = this.props.match
    if (this.props.match.path === '/profile') {
      this.props.handleInitProfile(match)
      this.setState({
        isEditable: true,
      })
    } else {
      for (let podcasterin of this.props.podcasterinnen) {
        if (podcasterin.id === this.props.match.params.id) {
          this.setState({
            profile: podcasterin,
          })
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.path === '/profile' && nextProps.profile !== this.state.profile) {
      const nextProfile = nextProps.profile
      const newProfile = {}
      Object.entries(nextProfile).forEach(([key, value]) => {
        if (value === null && key === 'podcasts') {
          newProfile.podcasts = [{
            name: '',
            url: '',
          }]
        } else if (value === null && key === 'languages') {
          newProfile.languages = ['']
        } else if (value === null && key === 'tags') {
          newProfile.tags = ['']
        } else if (value === null && key === 'references') {
          newProfile.references = [{
            title: '',
            url: '',
          }]
        } else {
          newProfile[key] = value
        }
      })
      this.setState({ 
        bioShortCharactersRemaining: 255 - newProfile.bio_short.length,
        profile: newProfile
      })
    } else {
      for (let podcasterin of nextProps.podcasterinnen) {
        // TODO: fix type error
        if (podcasterin.id == this.props.match.params.id) {
          this.setState({
            profile: podcasterin,
          })
        }
      }
    }
  }

  handleChange = (e, type) => {
    if (type === 'bio_short') {
      this.setState({
        bioShortCharactersRemaining: 255 - e.target.value.length,
      })
    }
    this.setState({
      profile: {...this.state.profile, [type]: e.target.value},
    })
  }

  handleEditToggle = () => {
    if (this.props.state !== 'STATE_EDITING') {
      this.props.handleEditingProfile()
    } else {
      this.props.handleEditingQuit()
    }
  }

  handleLanguagesChange = (index) => (e) => {
    e.preventDefault()
    const newLanguages = this.state.profile.languages.map((language, languageIndex) => {
      if (index !== languageIndex) {
        return language
      }
      return e.target.value
    })
    this.setState({
      profile: {...this.state.profile, languages: newLanguages},
    })
  }

  handleRemoveLanguagesInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, languages: this.state.profile.languages.filter((language, languageIndex) => index !== languageIndex)}
    })
  }

  handleAddLanguagesInput = (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, languages: this.state.profile.languages.concat([''])}
    })
  }

  handleAddPodcastsInput = (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, podcasts: this.state.profile.podcasts.concat([{ name: '', url: '' }])}
    })
  }

  handleRemovePodcastsInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, podcasts: this.state.profile.podcasts.filter((podcast, podcastIndex) => index !== podcastIndex)}
    })
    console.log(this.state)
  }

  handlePodcastsNameChange = (index) => (e) => {
    e.preventDefault()
    const newPodcasts = this.state.profile.podcasts.map((podcast, podcastIndex) => {
      if (index !== podcastIndex) {
        return podcast
      }
      return { name: e.target.value, url: podcast.url, id: podcast.id }
    })
    this.setState({
      profile: {...this.state.profile, podcasts: newPodcasts},
    })
  }

  handlePodcastsUrlChange = (index) => (e) => {
    e.preventDefault()
    const newPodcasts = this.state.profile.podcasts.map((podcast, podcastIndex) => {
      if (index !== podcastIndex) {
        return podcast
      }
      return { name: podcast.name, url: e.target.value, id: podcast.id }
    })
    this.setState({
      profile: {...this.state.profile, podcasts: newPodcasts},
    })
  }

  handleRemoteInput = (e) => {
    this.setState({
      profile: {...this.state.profile, remote_possible: !this.state.profile.remote_possible}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.profile)
    this.props.handleSubmitProfile(this.state.profile)
  }

  handleAddTagsInput = (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, tags: this.state.profile.tags.concat([''])}
    })
  }

  handleRemoveTagsInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, tags: this.state.profile.tags.filter((tag, tagIndex) => index !== tagIndex)}
    })
  }

  handleTagsChange = (index) => (e) => {
    e.preventDefault()
    const newTags = this.state.profile.tags.map((tag, tagIndex) => {
      if (index !== tagIndex) {
        return tag
      }
      return e.target.value
    })
    this.setState({
      profile: {...this.state.profile, tags: newTags},
    })
  }

  render() {
    const { state } = this.props
    const { isEditable, profile, staticTags } = this.state
    const patternDataTags = staticTags.join('|')

    return (
      <section className="profile main__section">
        { (state === 'STATE_DEFAULT' || state === 'STATE_REQUEST_SUCCESSFUL' || state === 'STATE_REQUEST_ERROR') &&
          <div>
            { isEditable && 
              <div className="message-container message-container--align-right">
                <button className="button button--decent" onClick={this.handleEditToggle}>Profil Bearbeiten</button>
              </div>
            }
            { profile &&
              <div className="profile__container">
                <img className="profile__avatar" alt={`Avatar-Foto von ${profile.forename}.`} src={`https://ui-avatars.com/api/?name=${profile.forename}&background=2C3E50&color=FFFFFF&font-size=0.125&size=200&length=100`} />
                <h1 className="profile__title">{profile.forename} {profile.surname}</h1>
                { profile.bio_short &&
                  <p className="profile__subtitle">{profile.bio_short}</p>
                }
                { profile.bio_long &&
                  <p>{profile.bio_long}</p>
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
                { (profile.remote_possible || profile.city || profile.twitter_url || profile.website_url) &&
                  <h3 className="profile__subheadline">Weitere Infos über {profile.forename}:</h3>
                }
                { profile.city &&
                  <p className="profile__info-text">Wohnort: {profile.city}
                  { profile.country &&
                    <span>, {profile.country}</span>
                  }
                  </p>
                }
                <p className="profile__info-text">Remote verfügbar?
                  { profile.remote_possible &&
                    <span> Ja</span>
                  }
                  { !profile.remote_possible &&
                    <span> Nein</span>
                  }
                </p>
                { profile.twitter_url &&
                  <p className="profile__info-text"><a href={profile.twitter_url} target="_blank">{profile.forename} auf Twitter</a></p>
                }
                { profile.website_url &&
                  <p className="profile__info-text"><a href={profile.website_url} target="_blank">{profile.forename}'s Webseite</a></p>
                }
              </div>
            }
          </div>
        }
        { state === 'STATE_SENDING_REQUEST' &&
          <p>Profil wird bearbeitet ...</p>
        }
        { state === 'STATE_EDITING' &&
          <div>
            <button className="button button--decent" onClick={this.handleEditToggle}>Bearbeiten beenden</button>
            <h2>Bearbeite dein Profil:</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div>
                <label>Vorname/Nickname</label>
                <input 
                  autoComplete="given-name"
                  onChange={(e) => this.handleChange(e, 'forename')} 
                  placeholder="Vorname" 
                  type="text"
                  value={profile.forename || ''}
                />
              </div>
              <div>
                <label>Nachname</label>
                <input 
                  autoComplete="family-name"
                  onChange={(e) => this.handleChange(e, 'surname')}
                  placeholder="Nachname"
                  type="text"
                  value={profile.surname || ''}
                />
              </div>
              <div>
                <input 
                  id="remotePossible"
                  name="remote"
                  onChange={(e) => this.handleRemoteInput(e)}
                  type="checkbox" 
                  value={profile.remote_possible || false}
                />
                <label htmlFor="remotePossible">Remote verfügbar</label>
              </div>
              <div>
                <h3 className="profile__subheadline">Podcasts</h3>
                { profile.podcasts && profile.podcasts.length && profile.podcasts.map((podcast, index) => (
                  <div key={index}>
                    <label>Name des Podcasts</label>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      list="podcasts-data"
                      onChange={this.handlePodcastsNameChange(index)}
                      placeholder="Name des Podcast"
                      value={podcast.name}
                      type="text"
                    />
                    <label>Link zur Webseite des Podcasts</label>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      list="podcasts-data"
                      onChange={this.handlePodcastsUrlChange(index)}
                      placeholder="Link zur Webseite des Podcast"
                      value={podcast.url}
                      type="url"
                    />
                    <button
                      className="button button--decent button--icon profile__button--delete"
                      onClick={this.handleRemovePodcastsInput(index)}
                      tabIndex="-1"
                    >-</button>
                  </div>
                ))}
                <button 
                  className="button profile__button--add"
                  onClick={(e) => this.handleAddPodcastsInput(e)}
                  tabIndex="-1"
                >Podcast hinzufügen</button>
              </div>
              <div>
                <label>Themen, über die ich spreche:</label>
                { profile.tags && profile.tags.length && profile.tags.map((tag, index) => (
                  <div key={index}>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      list="tags-data"
                      onChange={this.handleTagsChange(index)}
                      pattern={patternDataTags}
                      placeholder="Thema"
                      value={tag}
                      type="text"
                    />
                    <datalist id="tags-data">
                      { staticTags.map((staticTag, index) => (
                        <option key={index} value={staticTag} />
                      ))}
                    </datalist>
                    <button
                      className="button button--decent button--icon profile__button--delete"
                      onClick={this.handleRemoveTagsInput(index)}
                      tabIndex="-1"
                    >-</button>
                  </div>
                ))}
                <button 
                  className="button profile__button--add"
                  onClick={(e) => this.handleAddTagsInput(e)}
                  tabIndex="-1"
                >Thema hinzufügen</button>
              </div>
              <div>
                <label>Sprachen</label>
                { profile.languages && profile.languages.length && profile.languages.map((language, index) => (
                  <div key={index}>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      onChange={this.handleLanguagesChange(index)}
                      placeholder="Sprache"
                      value={language}
                      type="text"
                    />
                    <button
                      className="button button--decent button--icon profile__button--delete"
                      onClick={this.handleRemoveLanguagesInput(index)}
                      tabIndex="-1"
                    >-</button>
                  </div>
                ))}
                <button 
                  className="button profile__button--add"
                  onClick={(e) => this.handleAddLanguagesInput(e)}
                  tabIndex="-1"
                >Sprache hinzufügen</button>
              </div>
              <div>
                <label>
                  Kurz-Biographie
                  <span className="label label--right">{this.state.bioShortCharactersRemaining} Zeichen</span>
                </label>
                <textarea 
                  onChange={(e) => this.handleChange(e, 'bio_short')} 
                  placeholder="Kurz-Biographie" 
                  rows="3"
                  value={profile.bio_short || ''}
                  maxLength="255"
                ></textarea>
              </div>
              <div>
                <label>Über mich</label>
                <textarea 
                  onChange={(e) => this.handleChange(e, 'bio_long')} 
                  placeholder="Über mich" 
                  rows="6"
                  value={profile.bio_long || ''}
                ></textarea>
              </div>
              <div>
                <label>Twitter-URL</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'twitter_url')}
                  placeholder="Twitter-URL" 
                  type="url"
                  value={profile.twitter_url || ''}
                />
              </div>
              <div>
                <label>Webseite</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'website_url')} 
                  placeholder="Webseite" 
                  type="url"
                  value={profile.website_url || ''}
                />
              </div>
              <div>
                <label>Stadt</label>
                <input 
                  autoComplete="address-level-2"
                  onChange={(e) => this.handleChange(e, 'city')} 
                  placeholder="Stadt" 
                  type="text"
                  value={profile.city || ''}
                />
              </div>
              <div>
                <label>Land</label>
                <input 
                  autoComplete="address-level-1"
                  onChange={(e) => this.handleChange(e, 'country')} 
                  placeholder="Land" 
                  type="text"
                  value={profile.country || ''}
                />
              </div>
              <button 
                className="button" 
                type="submit" 
                value="submit"
              >Fertig</button>
            </form>
          </div>
        }
      </section>
    )
  }
}

Profile.propTypes = {
  podcasterinnen: PropTypes.array,
  profile: PropTypes.object,
  state: PropTypes.string,
}

Profile.defaultProps = {
  podcasterinnen: [],
  profile: {},
  state: 'STATE_DEFAULT',
}

const mapDispatchToProps = (dispatch) => ({
  handleEditingProfile: () => {
    dispatch(editingProfile())
  },
  handleEditingQuit: () => {
    dispatch(editingQuit())
  },
  handleInitProfile: (match) => {
    dispatch(initialiseProfile(match))
    .then(() => console.log('Profile loaded'))
  },
  handleSubmitProfile: (profile) => {
    dispatch(submitProfile(profile))
  },
})

const mapStateToProps = (state) => ({
  podcasterinnen: state.podcasterinnenReducer.podcasterinnen,
  profile: state.profileReducer.profile,
  state: state.profileReducer.state,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
