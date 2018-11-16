import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    const { 
      bioShortCharactersRemaining, 
      isEditable, 
      profile, 
      staticTags,
    } = this.state
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
              <ProfilePage
                profile={profile}
              ></ProfilePage>
            }
          </div>
        }
        { state === 'STATE_SENDING_REQUEST' &&
          <p>Profil wird bearbeitet ...</p>
        }
        { state === 'STATE_EDITING' &&
          <ProfileForm
            bioShortCharactersRemaining={bioShortCharactersRemaining}
            handleAddLanguagesInput={this.handleAddLanguagesInput}
            handleAddPodcastsInput={this.handleAddPodcastsInput}
            handleAddTagsInput={this.handleAddTagsInput}
            handleChange={this.handleChange}
            handleEditToggle={this.handleEditToggle}
            handleLanguagesChange={this.handleLanguagesChange}
            handlePodcastsNameChange={this.handlePodcastsNameChange}
            handlePodcastsUrlChange={this.handlePodcastsUrlChange}
            handleRemoteInput={this.handleRemoteInput}
            handleRemoveLanguagesInput={this.handleRemoveLanguagesInput}
            handleRemovePodcastsInput={this.handleRemovePodcastsInput}
            handleRemoveTagsInput={this.handleRemoveTagsInput}
            handleSubmit={this.handleSubmit}
            handleTagsChange={this.handleTagsChange}
            patternDataTags={patternDataTags}
            profile={profile}
            staticTags={staticTags}
          ></ProfileForm>
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
