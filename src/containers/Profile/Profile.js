import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Profile.css'
import { initialiseProfile } from './ProfileActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bioShort: '',
      bioLong: '',
      city: '',
      country: '',
      editing: false,
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
    this.setState({editing: !this.state.editing})
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <section className="profile">
        <h1 className="profile__headline">Profile</h1>
        <button handleEditToggle={this.handleEditToggle}>Bearbeiten</button>
        { !this.state.editing &&
         <p>Dein Profil</p>
        }
        { this.state.editing &&
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Vorname</label>
              <input onChange={() => this.handleChange('forename')} placeholder="Vorname" type="text" />
            </div>
            <div>
              <label>Nachname</label>
              <input onChange={() => this.handleChange('surname')} placeholder="Nachname" type="text" />
            </div>
            <div>
              <label>Kurz-Biographie</label>
              <textarea onChange={() => this.handleChange('bioShort')} placeholder="Kurz-Biographie"></textarea>
            </div>
            <div>
              <label>Über mich</label>
              <textarea onChange={() => this.handleChange('bioLong')} placeholder="Über mich"></textarea>
            </div>
            <div>
              <label>Twitter-URL</label>
              <input onChange={() => this.handleChange('twitter')} placeholder="Twitter-URL" type="url" />
            </div>
            <div>
              <label>Webseite</label>
              <input onChange={() => this.handleChange('website')} placeholder="Webseite" type="url" />
            </div>
            <div>
              <label>Stadt</label>
              <input onChange={() => this.handleChange('city')} placeholder="Stadt" type="text" />
            </div>
            <div>
              <label>Land</label>
              <input onChange={() => this.handleChange('country')} placeholder="Land" type="text" />
            </div>
            <button type="submit" value="submit">Login</button>
          </form>
        }
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitProfile: () => {
    dispatch(initialiseProfile())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Profile)
