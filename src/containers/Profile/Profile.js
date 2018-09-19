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
    this.props.handleInitProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.state.profile) {
      this.setState({ profile: nextProps.profile })
    }
  }

  handleChange = (e, type) => {
    this.setState({
      profile: {...this.state.profile, [type]: e.target.value}
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
    const { profile, staticTags } = this.state
    const patternDataTags = staticTags.join('|')

    return (
      <section className="profile main__section">
        <h1 className="profile__headline">Profil</h1>
        { (state === 'STATE_DEFAULT' || state === 'STATE_REQUEST_SUCCESSFUL' || state === 'STATE_REQUEST_ERROR') &&
          <div>
            <button className="button button--decent" onClick={this.handleEditToggle}>Bearbeiten</button>
            <h2>Dein Profil</h2>
            { profile &&
              <div>
                <p>{profile.forename} {profile.surname}</p>
                <p>Remote verfügbar:
                  { profile.remote_possible &&
                    <span> Ja</span>
                  }
                  { !profile.remote_possible &&
                    <span> Nein</span>
                  }
                </p>
                { profile.bio_short &&
                  <p>{profile.bio_short}</p>
                }
                { profile.bio_long &&
                  <p>{profile.bio_long}</p>
                }
                { profile.city &&
                  <p>{profile.city}
                  { profile.country &&
                    <span>, {profile.country}</span>
                  }
                  </p>
                }
                { profile.twitter_url &&
                  <p><a href={profile.twitter_url} target="_blank">{profile.twitter_url}</a></p>
                }
                { profile.website_url &&
                  <p><a href={profile.website_url} target="_blank">{profile.website_url}</a></p>
                }
                { (Array.isArray(profile.podcasts) && profile.podcasts.length > 0 && profile.podcasts[0].name !== '') &&
                  <div>
                    <h3>Podcasts:</h3>
                    <ul>
                      { profile.podcasts.map((podcast) => (
                        <li key={podcast.name}><a href={podcast.url} target="_blank">{podcast.name}</a></li>
                      ))}
                    </ul>
                  </div>
                }
                { (Array.isArray(profile.languages) && profile.languages.length > 0 && profile.languages[0] !== '') &&
                  <div>
                    <h3>Sprachen:</h3>
                    <ul>
                      { profile.languages.map((language) => (
                        <li key={language}>{language}</li>
                      ))}
                    </ul>
                  </div>
                }
                { (Array.isArray(profile.tags) && profile.tags.length > 0 && profile.tags[0] !== '') &&
                  <div>
                    <h3>Themen:</h3>
                    <ul>
                      { profile.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
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
                <label>Vorname</label>
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
                <h3>Podcasts</h3>
                { profile.podcasts.map((podcast, index) => (
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
                    <label>Feed-URL des Podcasts</label>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      list="podcasts-data"
                      onChange={this.handlePodcastsUrlChange(index)}
                      placeholder="Feed-URL des Podcast"
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
                <label>Schlagworte</label>
                { profile.tags.map((tag, index) => (
                  <div key={index}>
                    <input
                      autoComplete="off"
                      className="profile__input--multi"
                      list="tags-data"
                      onChange={this.handleTagsChange(index)}
                      pattern={patternDataTags}
                      placeholder="Schlagwort"
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
                >Schlagwort hinzufügen</button>
              </div>
              <div>
                <label>Sprachen</label>
                { profile.languages.map((language, index) => (
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
                <label>Kurz-Biographie</label>
                <textarea 
                  onChange={(e) => this.handleChange(e, 'bio_short')} 
                  placeholder="Kurz-Biographie" 
                  rows="3"
                  value={profile.bio_short || ''}
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
  profile: PropTypes.object,
  state: PropTypes.string,
}

Profile.defaultProps = {
  profile: null,
  state: 'STATE_DEFAULT',
}

const mapDispatchToProps = (dispatch) => ({
  handleEditingProfile: () => {
    dispatch(editingProfile())
  },
  handleEditingQuit: () => {
    dispatch(editingQuit())
  },
  handleInitProfile: () => {
    dispatch(initialiseProfile())
    .then(() => console.log('Profile loaded'))
  },
  handleSubmitProfile: (profile) => {
    dispatch(submitProfile(profile))
  },
})

const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  state: state.profileReducer.state,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
