import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
        surname: '',
        twitter_url: '',
        website_url: '',
      },
      tags: [{
        name: '',
      }],
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmitProfile(this.state.profile)
  }

  handleAddTagsInput = (e) => {
    e.preventDefault()
    this.setState({
      tags: this.state.tags.concat([{ name: '' }])
    })
  }

  handleRemoveTagsInput = (index) => (e) => {
    e.preventDefault()
    this.setState({
      tags: this.state.tags.filter((tag, tagIndex) => index !== tagIndex)
    })
  }

  handleTagsChange = (index) => (e) => {
    e.preventDefault()
    const newTags = this.state.tags.map((tag, tagIndex) => {
      if (index !== tagIndex) {
        return tag
      }
      return { ...tag, name: e.target.value }
    })
    this.setState({
      tags: newTags,
    })
  }

  render() {
    const { state } = this.props
    const { profile, tags } = this.state

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
                { (tags && tags[0].name && tags[0].name !== '') &&
                  <ul>
                    { tags.map((tag, index) => {
                      if (tag.name !== '') {
                        return (
                          <li key={index}>{tag.name}</li>
                        )
                      }
                    })}
                  </ul>
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
                <label>Schlagworte</label>
                { tags.map((tag, index) => (
                  <div key={index}>
                    <input
                      className="profile__input--multi"
                      onChange={this.handleTagsChange(index)}
                      placeholder="Schlagwort"
                      value={tag.name}
                      type="text"
                    />
                    <button
                      className="button button--icon profile__button--delete"
                      onClick={this.handleRemoveTagsInput(index)}
                    >-</button>
                  </div>
                ))}
                <button 
                  className="button profile__button--add"
                  onClick={(e) => this.handleAddTagsInput(e)}
                >Schlagwort hinzufügen</button>
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
