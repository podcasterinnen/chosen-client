import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileForm extends Component {
  
  render() {
    const { 
      bioShortCharactersRemaining,
      handleAddLanguagesInput,
      handleAddPodcastsInput,
      handleAddTagsInput,
      handleChange,
      handleEditToggle,
      handleLanguagesChange,
      handlePodcastsNameChange,
      handlePodcastsUrlChange,
      handleRemoteInput,
      handleRemoveLanguagesInput,
      handleRemovePodcastsInput,
      handleRemoveTagsInput,
      handleSubmit,
      handleTagsChange,
      patternDataTags, 
      profile, 
      staticTags,
    } = this.props

    return(
      <div>
        <button className="button button--decent" onClick={handleEditToggle}>Bearbeiten beenden</button>
        <h2>Bearbeite dein Profil:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Vorname/Nickname</label>
            <input 
              autoComplete="given-name"
              onChange={(e) => handleChange(e, 'forename')} 
              placeholder="Vorname" 
              type="text"
              value={profile.forename || ''}
            />
          </div>
          <div>
            <label>Nachname</label>
            <input 
              autoComplete="family-name"
              onChange={(e) => handleChange(e, 'surname')}
              placeholder="Nachname"
              type="text"
              value={profile.surname || ''}
            />
          </div>
          <div>
            <label>
              Kurz-Biographie
              <span className="label label--right">{bioShortCharactersRemaining} Zeichen</span>
            </label>
            <textarea 
              maxLength="255"
              onChange={(e) => handleChange(e, 'bio_short')} 
              placeholder="Kurz-Biographie" 
              rows="3"
              value={profile.bio_short || ''}
            ></textarea>
          </div>
          <div>
            <label>Über mich</label>
            <textarea 
              onChange={(e) => handleChange(e, 'bio_long')} 
              placeholder="Über mich" 
              rows="6"
              value={profile.bio_long || ''}
            ></textarea>
          </div>
          <div>
            <label>Themen, über die ich spreche:</label>
            { profile.tags && profile.tags.length && profile.tags.map((tag, index) => (
              <div key={index}>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="tags-data"
                  onChange={handleTagsChange(index)}
                  pattern={patternDataTags}
                  placeholder="Thema"
                  type="text"
                  value={tag}
                />
                <datalist id="tags-data">
                  { staticTags.map((staticTag, index) => (
                    <option key={index} value={staticTag} />
                  ))}
                </datalist>
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemoveTagsInput(index)}
                  tabIndex="-1"
                >-</button>
              </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddTagsInput(e)}
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
                  onChange={handleLanguagesChange(index)}
                  placeholder="Sprache"
                  type="text"
                  value={language}
                />
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemoveLanguagesInput(index)}
                  tabIndex="-1"
                >-</button>
              </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddLanguagesInput(e)}
              tabIndex="-1"
            >Sprache hinzufügen</button>
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
                  onChange={handlePodcastsNameChange(index)}
                  placeholder="Name des Podcast"
                  type="text"
                  value={podcast.name}
                />
                <label>Link zur Webseite des Podcasts</label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="podcasts-data"
                  onChange={handlePodcastsUrlChange(index)}
                  placeholder="Link zur Webseite des Podcast"
                  type="url"
                  value={podcast.url}
                />
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemovePodcastsInput(index)}
                  tabIndex="-1"
                >-</button>
              </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddPodcastsInput(e)}
              tabIndex="-1"
            >Podcast hinzufügen</button>
          </div>
          <div>
            <input 
              id="remotePossible"
              name="remote"
              onChange={(e) => handleRemoteInput(e)}
              type="checkbox" 
              value={profile.remote_possible || false}
            />
            <label htmlFor="remotePossible">Remote verfügbar</label>
          </div>
          <div>
            <label>Stadt</label>
            <input 
              autoComplete="address-level-2"
              onChange={(e) => handleChange(e, 'city')} 
              placeholder="Stadt" 
              type="text"
              value={profile.city || ''}
            />
          </div>
          <div>
            <label>Land</label>
            <input 
              autoComplete="address-level-1"
              onChange={(e) => handleChange(e, 'country')} 
              placeholder="Land" 
              type="text"
              value={profile.country || ''}
            />
          </div>
          <div>
            <label>Twitter-URL</label>
            <input 
              onChange={(e) => handleChange(e, 'twitter_url')}
              placeholder="Twitter-URL" 
              type="url"
              value={profile.twitter_url || ''}
            />
          </div>
          <div>
            <label>Webseite</label>
            <input 
              onChange={(e) => handleChange(e, 'website_url')} 
              placeholder="Webseite" 
              type="url"
              value={profile.website_url || ''}
            />
          </div>
          <button 
            className="button" 
            type="submit" 
            value="submit"
          >Fertig</button>
        </form>
      </div>
    )
  }
}

ProfileForm.propTypes = {
  bioShortCharactersRemaining: PropTypes.number,
  handleAddLanguagesInput: PropTypes.func,
  handleAddPodcastsInput: PropTypes.func,
  handleAddTagsInput: PropTypes.func,
  handleChange: PropTypes.func,
  handleEditToggle: PropTypes.func,
  handleLanguagesChange: PropTypes.func,
  handlePodcastsNameChange: PropTypes.func,
  handlePodcastsUrlChange: PropTypes.func,
  handleRemoteInput: PropTypes.func,
  handleRemoveLanguagesInput: PropTypes.func,
  handleRemovePodcastsInput: PropTypes.func,
  handleRemoveTagsInput: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleTagsChange: PropTypes.func,
  patternDataTags: PropTypes.string, 
  profile: PropTypes.object, 
  staticTags: PropTypes.array,
}
ProfileForm.defaultProps = {
  bioShortCharactersRemaining: undefined,
  handleAddLanguagesInput: undefined,
  handleAddPodcastsInput: undefined,
  handleAddTagsInput: undefined,
  handleChange: undefined,
  handleEditToggle: undefined,
  handleLanguagesChange: undefined,
  handlePodcastsNameChange: undefined,
  handlePodcastsUrlChange: undefined,
  handleRemoteInput: undefined,
  handleRemoveLanguagesInput: undefined,
  handleRemovePodcastsInput: undefined,
  handleRemoveTagsInput: undefined,
  handleSubmit: undefined,
  handleTagsChange: undefined,
  patternDataTags: undefined, 
  profile: undefined, 
  staticTags: undefined,
}

export default ProfileForm