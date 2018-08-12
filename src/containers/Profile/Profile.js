import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Profile.css'
import { submitProfile, editingProfile, initialiseProfile } from './ProfileActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bioShort: '',
      bioLong: '',
      city: '',
      country: '',
      forename: '',
      surname: '',
      twitter: '',
      website: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.handleInitProfile()
  }

  handleChange = (e, type) => {
    switch(type) {
    case 'bioLong':
      this.setState({ bioLong: e.target.value })
      break
    case 'bioShort':
      this.setState({ bioShort: e.target.value })
      break
    case 'city':
      this.setState({ city: e.target.value })
      break
    case 'country':
      this.setState({ country: e.target.value })
      break
    case 'forename':
      this.setState({ forename: e.target.value })
      break
    case 'surname':
      this.setState({ surname: e.target.value })
      break
    case 'twitter':
      this.setState({ twitter: e.target.value })
      break
    case 'website':
      this.setState({ website: e.target.value })
      break
    default:
      return
    }
  }

  handleEditToggle = () => {
    this.props.handleEditingProfile()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmitProfile({
      bio_short: this.state.bioShort,
      bio_long: this.state.bioLong,
      city: this.state.city,
      country: this.state.country,
      forename: this.state.forename,
      surname: this.state.surname,
      twitter: this.state.twitter,
      website: this.state.website,
    })
  }

  render() {
    const { profile, state } = this.props
    return (
      <section className="profile main__section">
        <h1 className="profile__headline">Profil</h1>
        { (state === 'STATE_DEFAULT' || state === 'STATE_REQUEST_SUCCESSFUL' || state === 'STATE_REQUEST_ERROR') &&
          <div>
            <button className="button button--decent" onClick={this.handleEditToggle}>Bearbeiten</button>
            <h2>Dein Profil</h2>
            { profile &&
              <div>
                <p>{profile.forename} {profile.lastname}</p>
                <p>{profile.bio_short}</p>
                <p>{profile.bio_long}</p>
                <p>{profile.city}, {profile.country}</p>
                <p>{profile.twitter}</p>
                <p>{profile.website}</p>
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
                />
              </div>
              <div>
                <label>Nachname</label>
                <input 
                  autoComplete="family-name"
                  onChange={(e) => this.handleChange(e, 'surname')}
                  placeholder="Nachname"
                  type="text"
                />
              </div>
              <div>
                <label>Kurz-Biographie</label>
                <textarea 
                  onChange={(e) => this.handleChange(e, 'bioShort')} 
                  placeholder="Kurz-Biographie" 
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label>Über mich</label>
                <textarea 
                  onChange={(e) => this.handleChange(e, 'bioLong')} 
                  placeholder="Über mich" 
                  rows="6"
                ></textarea>
              </div>
              <div>
                <label>Twitter-URL</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'twitter')}
                  placeholder="Twitter-URL" 
                  type="url"
                />
              </div>
              <div>
                <label>Webseite</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'website')} 
                  placeholder="Webseite" 
                  type="url"
                />
              </div>
              <div>
                <label>Stadt</label>
                <input 
                  autoComplete="address-level-2"
                  onChange={(e) => this.handleChange(e, 'city')} 
                  placeholder="Stadt" 
                  type="text"
                />
              </div>
              <div>
                <label>Land</label>
                <input 
                  autoComplete="address-level-1"
                  onChange={(e) => this.handleChange(e, 'country')} 
                  placeholder="Land" 
                  type="text"
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
  handleInitProfile: () => {
    dispatch(initialiseProfile())
    .then(() => console.log('Profile loaded.'))
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
