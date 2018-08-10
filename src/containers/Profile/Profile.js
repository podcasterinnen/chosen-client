import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      <section className="profile main__section">
        <h1 className="profile__headline">Profil</h1>
        { !this.state.editing &&
          <div>
            <button className="button button--decent" onClick={this.handleEditToggle}>Bearbeiten</button>
            <h2>Dein Profil</h2>
          </div>
        }
        { this.state.editing &&
          <div>
            <button className="button button--decent" onClick={this.handleEditToggle}>Bearbeiten beenden</button>
            <h2>Bearbeite dein Profil:</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div>
                <label>Vorname</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'forename')} 
                  placeholder="Vorname" 
                  type="text"
                />
              </div>
              <div>
                <label>Nachname</label>
                <input 
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
                  onChange={(e) => this.handleChange(e, 'city')} 
                  placeholder="Stadt" 
                  type="text"
                />
              </div>
              <div>
                <label>Land</label>
                <input 
                  onChange={(e) => this.handleChange(e, 'country')} 
                  placeholder="Land" 
                  type="text"
                />
              </div>
              <button 
                className="button" 
                type="submit" 
                value="submit"
              >Login</button>
            </form>
          </div>
        }
      </section>
    )
  }
}

Profile.propTypes = {
  podcasterinnen: PropTypes.array,
}

Profile.defaultProps = {
  podcasterinnen: null,
}

const mapDispatchToProps = (dispatch) => ({
  handleInitProfile: () => {
    dispatch(initialiseProfile())
  }
})

const mapStateToProps = (state) => ({
  podcasterinnen: state.podcasterinnenReducer.podcasterinnen,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
