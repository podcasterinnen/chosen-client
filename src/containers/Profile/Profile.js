import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import pronouns from '../../assets/data/pronouns.json'
import staticTags from '../../assets/data/tags.json'

import './Profile.css'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import ProfilePage from '../../components/ProfilePage/ProfilePage'
import { submitProfile, editingProfile, editingQuit, initialiseProfile } from './ProfileActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bioShortCharactersRemaining: 255,
      isEditable: false,
      profile: {
        avatar: [],
        bioShort: '',
        bioLong: '',
        city: '',
        country: '',
        forename: '',
        imgUrlPreview: '',
        languages: [''],
        podcasts: [{
          description: '',
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
        talks: false,
        workshops: false,
        foreign_language: false,
        record_outside: false,
        guests: false,
        travel: false,
        podcast_production: false,
      },
      pronouns: pronouns.pronouns,
      staticTags: staticTags.tags,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const match = this.props.match
    if (this.props.location.pathname === '/profile') {
      this.props.handleInitProfile(match)
      this.setState({
        isEditable: true,
      })
      document.title = 'Mein Profil – podcasterinnen.org'
    } else {
      for (let podcasterin of this.props.podcasterinnen) {
        this.checkForProfile(podcasterin)
      }
    }
  }

  checkForProfile = (podcasterin) => {
    if (
        (podcasterin &&
        podcasterin.podcasts &&
        this.props.location.pathname === `/podcasterinnen/${podcasterin.forename.replace(/\s+/g, '-').toLowerCase()}-${podcasterin.podcasts[0].name.replace(/–|-/g, ' ').replace(/\s+/g, '-').toLowerCase()}`) ||
        (this.props.location.state &&
        podcasterin &&
        // eslint-disable-next-line
        podcasterin.id == this.props.location.state.id)
      ) {
      document.title = `${podcasterin.forename} – podcasterinnen.org`
      this.setState({
        profile: podcasterin,
      })
    } else if (window.location.pathname === `/podcasterinnen/${podcasterin.id}`) {
      // redirect old profiles
      window.location.replace(`/podcasterinnen/${podcasterin.forename.replace(/\s+/g, '-').toLowerCase()}-${podcasterin.podcasts[0].name.replace(/–|-/g, ' ').replace(/\s+/g, '-').toLowerCase()}`)
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
            description: '',
            url: '',
          }]
        } else if (value === null && key === 'languages') {
          newProfile.languages = ['']
        } else if (value === null && key === 'tags') {
          newProfile.tags = ['']
        } else if (value === null && key === 'references') {
          newProfile.references = [{
            title: '',
            description: '',
            url: '',
          }]
        } else {
          newProfile[key] = value
        }
      })
      this.setState({ profile: newProfile })
      document.title = `${newProfile.forename} – podcasterinnen.org`
      if (newProfile.bio_short) {
        this.setState({ bioShortCharactersRemaining: 255 - newProfile.bio_short.length })
      }
    } else {
      for (let podcasterin of nextProps.podcasterinnen) {
        // TODO: fix type error
        this.checkForProfile(podcasterin)
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
      profile: {...this.state.profile, podcasts: this.state.profile.podcasts.concat([{ name: '', description: '', url: '' }])}
    })
  }

  handleAddReferencesInput = (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, references: this.state.profile.references.concat([{ title: '', description: '', url: '' }])}
    })
  }

  handleAvatarDrop = (files) => {
    this.setState({
      imgUrlPreview: URL.createObjectURL(files[0]),
      profile: {
        ...this.state.profile,
        avatar: files[0]
      },
    })
  }

  handleRemovePodcastsInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, podcasts: this.state.profile.podcasts.filter((podcast, podcastIndex) => index !== podcastIndex)}
    })
  }

  handleRemoveReferencesInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      profile: {...this.state.profile, references: this.state.profile.references.filter((reference, referenceIndex) => index !== referenceIndex)}
    })
  }

  handlePodcastsDescriptionChange = (index) => (e) => {
    e.preventDefault()
    const newPodcasts = this.state.profile.podcasts.map((podcast, podcastIndex) => {
      if (index !== podcastIndex) {
        return podcast
      }
      return { name: podcast.name, description: e.target.value, url: podcast.url, id: podcast.id }
    })
    this.setState({
      profile: {...this.state.profile, podcasts: newPodcasts},
    })
  }

  handlePodcastsNameChange = (index) => (e) => {
    e.preventDefault()
    const newPodcasts = this.state.profile.podcasts.map((podcast, podcastIndex) => {
      if (index !== podcastIndex) {
        return podcast
      }
      return { name: e.target.value, description: podcast.description, url: podcast.url, id: podcast.id }
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
      return { name: podcast.name, description: podcast.description, url: e.target.value, id: podcast.id }
    })
    this.setState({
      profile: {...this.state.profile, podcasts: newPodcasts},
    })
  }

  handleReferencesDescriptionChange = (index) => (e) => {
    e.preventDefault()
    const newReferences = this.state.profile.references.map((reference, referenceIndex) => {
      if (index !== referenceIndex) {
        return reference
      }
      return { title: reference.title, description: e.target.value, url: reference.url, id: reference.id }
    })
    this.setState({
      profile: {...this.state.profile, references: newReferences},
    })
  }

  handleReferencesNameChange = (index) => (e) => {
    e.preventDefault()
    const newReferences = this.state.profile.references.map((reference, referenceIndex) => {
      if (index !== referenceIndex) {
        return reference
      }
      return { title: e.target.value, description: reference.description, url: reference.url, id: reference.id }
    })
    this.setState({
      profile: {...this.state.profile, references: newReferences},
    })
  }

  handleReferencesUrlChange = (index) => (e) => {
    e.preventDefault()
    const newReferences = this.state.profile.references.map((reference, referenceIndex) => {
      if (index !== referenceIndex) {
        return reference
      }
      return { title: reference.title, description: reference.description, url: e.target.value, id: reference.id }
    })
    this.setState({
      profile: {...this.state.profile, references: newReferences},
    })
  }

  handleCheckboxInput = (e, type) => {
    switch (type) {
    case 'REMOTE':
      this.setState({
        profile: {...this.state.profile, remote_possible: !this.state.profile.remote_possible}
      })
      break
    case 'TALKS':
      this.setState({
        profile: {...this.state.profile, talks: !this.state.profile.talks}
      })
      break
    case 'WORKSHOPS':
      this.setState({
        profile: {...this.state.profile, workshops: !this.state.profile.workshops}
      })
      break
    case 'FOREIGN_LANGUAGE':
      this.setState({
        profile: {...this.state.profile, foreign_language: !this.state.profile.foreign_language}
      })
      break
    case 'RECORD_OUTSIDE':
      this.setState({
        profile: {...this.state.profile, record_outside: !this.state.profile.record_outside}
      })
      break
    case 'GUESTS':
      this.setState({
        profile: {...this.state.profile, guests: !this.state.profile.guests}
      })
      break
    case 'TRAVEL':
      this.setState({
        profile: {...this.state.profile, travel: !this.state.profile.travel}
      })
      break
    case 'PODCAST_PRODUCTION':
      this.setState({
        profile: {...this.state.profile, podcast_production: !this.state.profile.podcast_production}
      })
      break
    default:
      return
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmitProfile(this.state.profile)
  }

  handlePronounsChange = (index) => (event) => {
    let newPronouns = this.state.profile.pronouns || []
    this.state.pronouns.forEach((pronoun, i) => {
      // Add or remove tag from new pronouns depending on checkbox value
      if (index === i && event.target.checked === true) {
        newPronouns.push(pronoun)
      } else if (index === i && event.target.checked === false) {
        const pronounIndex = newPronouns.indexOf(pronoun)
        if (pronounIndex !== -1) {
          newPronouns.splice(pronounIndex, 1)
        }
      }
    })
    // eslint-disable-next-line
    newPronouns = newPronouns.filter((entry) => (entry.trim() != ''))
    this.setState({
      profile: {...this.state.profile, pronouns: newPronouns},
    })
  }

  handleTagsChange = (index) => (event) => {
    let newTags = this.state.profile.tags
    this.state.staticTags.forEach((staticTag, i) => {
      // Add or remove tag from new tags depending on checkbox value
      if (index === i && event.target.checked === true) {
        newTags.push(staticTag)
      } else if (index === i && event.target.checked === false) {
        const tagIndex = newTags.indexOf(staticTag)
        if (tagIndex !== -1) {
          newTags.splice(tagIndex, 1)
        }
      }
    })
    // eslint-disable-next-line
    newTags = newTags.filter((entry) => (entry.trim() != ''))
    this.setState({
      profile: {...this.state.profile, tags: newTags},
    })
  }

  render() {
    const { 
      location,
      state,
    } = this.props
    const { 
      bioShortCharactersRemaining,
      imgUrlPreview,
      isEditable, 
      profile, 
      pronouns,
      staticTags,
    } = this.state

    return (
      <section className="profile main__section">
        { (
            state === 'STATE_DEFAULT' || state === 'STATE_REQUEST_SUCCESSFUL' || state === 'STATE_REQUEST_ERROR' ||
            (state === 'STATE_EDITING' && location.pathname !== '/profile')
          ) &&
          <div>
            { ((!profile || !profile.bio_short || !profile.podcasts.length || profile.podcasts[0].name === '') &&
              location.pathname === '/profile') &&
              <div className="profile-form__banner">
                <p className="profile-form__banner__text">Es sieht so aus als wäre dein Profil noch nicht ausgefüllt. Beginne doch damit, dein Profil zu vervollständigen.</p>
              </div>
            }
            { isEditable && 
              <div className="message-container message-container--align-right">
                <button className="button button--decent" onClick={this.handleEditToggle}>Profil Bearbeiten</button>
              </div>
            }
            <ProfilePage
              profile={profile}
            ></ProfilePage>
          </div>
        }
        { state === 'STATE_SENDING_REQUEST' &&
          <p>Profil wird bearbeitet ...</p>
        }
        { (state === 'STATE_EDITING' && location.pathname === '/profile') &&
          <ProfileForm
            bioShortCharactersRemaining={bioShortCharactersRemaining}
            handleAddLanguagesInput={this.handleAddLanguagesInput}
            handleAddPodcastsInput={this.handleAddPodcastsInput}
            handleAddReferencesInput={this.handleAddReferencesInput}
            handleAvatarDrop={this.handleAvatarDrop}
            handleChange={this.handleChange}
            handleCheckboxInput={this.handleCheckboxInput}
            handleEditToggle={this.handleEditToggle}
            handleLanguagesChange={this.handleLanguagesChange}
            handlePodcastsDescriptionChange={this.handlePodcastsDescriptionChange}
            handlePodcastsNameChange={this.handlePodcastsNameChange}
            handlePodcastsUrlChange={this.handlePodcastsUrlChange}
            handleReferencesDescriptionChange={this.handleReferencesDescriptionChange}
            handleReferencesNameChange={this.handleReferencesNameChange}
            handleReferencesUrlChange={this.handleReferencesUrlChange}
            handleRemoveLanguagesInput={this.handleRemoveLanguagesInput}
            handleRemovePodcastsInput={this.handleRemovePodcastsInput}
            handleRemoveReferencesInput={this.handleRemoveReferencesInput}
            handleSubmit={this.handleSubmit}
            handlePronounsChange={this.handlePronounsChange}
            handleTagsChange={this.handleTagsChange}
            imgUrlPreview={imgUrlPreview}
            profile={profile}
            pronouns={pronouns}
            staticTags={staticTags}
          ></ProfileForm>
        }
      </section>
    )
  }
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  handleInitProfile: PropTypes.func,
  handleEditingProfile: PropTypes.func,
  handleEditingQuit: PropTypes.func,
  handleSubmitProfile: PropTypes.func,
  podcasterinnen: PropTypes.array,
  profile: PropTypes.object,
  state: PropTypes.string,
}

Profile.defaultProps = {
  handleInitProfile: undefined,
  handleEditingProfile: undefined,
  handleEditingQuit: undefined,
  handleSubmitProfile: undefined,
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
