import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ProfileForm.css'

class ProfileForm extends Component {
  
  render() {
    const { 
      bioShortCharactersRemaining,
      handleAddLanguagesInput,
      handleAddPodcastsInput,
      handleAddReferencesInput,
      handleAddTagsInput,
      handleChange,
      handleEditToggle,
      handleLanguagesChange,
      handlePodcastsDescriptionChange,
      handlePodcastsNameChange,
      handlePodcastsUrlChange,
      handleCheckboxInput,
      handleReferencesDescriptionChange,
      handleReferencesNameChange,
      handleReferencesUrlChange,
      handleRemoveLanguagesInput,
      handleRemovePodcastsInput,
      handleRemoveReferencesInput,
      handleRemoveTagsInput,
      handleSubmit,
      handleTagsChange,
      patternDataTags, 
      profile, 
      staticTags,
    } = this.props

    console.log('1', profile)

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
                <label>
                  Kurze Beschreibung des Podcasts
                </label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="podcasts-data"
                  maxLength="144"
                  onChange={handlePodcastsDescriptionChange(index)}
                  placeholder="Kurze Beschreibung des Podcasts"
                  type="text"
                  value={podcast.description}
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
            <h3 className="profile__subheadline">Referenzen</h3>
            { profile.references && profile.references.length && profile.references.map((reference, index) => (
              <div key={index}>
                <label>Titel</label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="references-data"
                  onChange={handleReferencesNameChange(index)}
                  placeholder="Titel"
                  type="text"
                  value={reference.title}
                />
                <label>
                  Kurze Beschreibung
                </label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="references-data"
                  maxLength="144"
                  onChange={handleReferencesDescriptionChange(index)}
                  placeholder="Kurze Beschreibung"
                  type="text"
                  value={reference.description}
                />
                <label>Link</label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="references-data"
                  onChange={handleReferencesUrlChange(index)}
                  placeholder="Link"
                  type="url"
                  value={reference.url}
                />
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemoveReferencesInput(index)}
                  tabIndex="-1"
                >-</button>
              </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddReferencesInput(e)}
              tabIndex="-1"
            >Referenz hinzufügen</button>
          </div>
          <div>
            <h3 className="profile__subheadline">Dazu kann man mich anfragen:</h3>
            <div>
              <input 
                id="talksPossible"
                name="talks"
                onChange={(e) => handleCheckboxInput(e, 'TALKS')}
                type="checkbox" 
                checked={profile.talks || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="talksPossible"
              >Ich halte Vorträge.</label>
            </div>
            <div>
              <input 
                id="workshopsPossible"
                name="workshops"
                onChange={(e) => handleCheckboxInput(e, 'WORKSHOPS')}
                type="checkbox" 
                checked={profile.workshops || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="workshopsPossible"
              >Ich gebe Workshops/Schulungen.</label>
            </div>
            <div>
              <input 
                id="remotePossible"
                name="remote"
                onChange={(e) => handleCheckboxInput(e, 'REMOTE')}
                type="checkbox" 
                checked={profile.remote_possible || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="remotePossible"
              >Ich kann remote aufnehmen.</label>
            </div>
            <div>
              <input 
                id="foreignLanguagePossible"
                name="foreignLanguage"
                onChange={(e) => handleCheckboxInput(e, 'FOREIGN_LANGUAGE')}
                type="checkbox" 
                checked={profile.foreign_language || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="foreignLanguagePossible"
              >Ich nehme auch fremdsprachige Podcasts auf.</label>
            </div>
            <div>
              <input 
                id="recordOutsidePossible"
                name="recordOutside"
                onChange={(e) => handleCheckboxInput(e, 'RECORD_OUTSIDE')}
                type="checkbox" 
                checked={profile.record_outside || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="recordOutsidePossible"
              >Ich nehme auch Podcasts draußen auf.</label>
            </div>
            <div>
              <input 
                id="guestsPossible"
                name="guests"
                onChange={(e) => handleCheckboxInput(e, 'GUESTS')}
                type="checkbox" 
                checked={profile.guests || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="guestsPossible"
              >Ich lade auch Gästinnen ein.</label>
            </div>
            <div>
              <input 
                id="travelPossible"
                name="travel"
                onChange={(e) => handleCheckboxInput(e, 'TRAVEL')}
                type="checkbox" 
                checked={profile.travel || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="travelPossible"
              >Ich reise auch um Podcasts aufzuzeichnen.</label>
            </div>
            <div>
              <input 
                id="podcastProductionPossible"
                name="podcastProduction"
                onChange={(e) => handleCheckboxInput(e, 'PODCAST_PRODUCTION')}
                type="checkbox" 
                checked={profile.podcast_production || false}
              />
              <label 
                className="label label--checkbox"
                htmlFor="podcastProductionPossible"
              >Ich kann Podcasts schneiden, aufnehmen und produzieren.</label>
            </div>
          </div>
          <div>
          <h3 className="profile__subheadline">Weitere Infos über mich:</h3>
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
              <label>Twitter-Handle</label>
              <span className="profile-form__twitter-at">@</span>
              <input 
                className="profile-form__twitter-input"
                onChange={(e) => handleChange(e, 'twitter_url')}
                placeholder="buffysummers" 
                type="text"
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
  handleAddReferencesInput: PropTypes.func,
  handleAddTagsInput: PropTypes.func,
  handleChange: PropTypes.func,
  handleCheckboxInput: PropTypes.func,
  handleEditToggle: PropTypes.func,
  handleLanguagesChange: PropTypes.func,
  handlePodcastsDescriptionChange: PropTypes.func,
  handlePodcastsNameChange: PropTypes.func,
  handlePodcastsUrlChange: PropTypes.func,
  handleReferencesDescriptionChange: PropTypes.func,
  handleReferencesNameChange: PropTypes.func,
  handleReferencesUrlChange: PropTypes.func,
  handleRemoveLanguagesInput: PropTypes.func,
  handleRemovePodcastsInput: PropTypes.func,
  handleRemoveReferencesInput: PropTypes.func,
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
  handleAddReferencesInput: undefined,
  handleAddTagsInput: undefined,
  handleChange: undefined,
  handleCheckboxInput: undefined,
  handleEditToggle: undefined,
  handleLanguagesChange: undefined,
  handlePodcastsDescriptionChange: undefined,
  handlePodcastsNameChange: undefined,
  handlePodcastsUrlChange: undefined,
  handleReferencesDescriptionChange: undefined,
  handleReferencesNameChange: undefined,
  handleReferencesUrlChange: undefined,
  handleRemoveLanguagesInput: undefined,
  handleRemovePodcastsInput: undefined,
  handleRemoveReferencesInput: undefined,
  handleRemoveTagsInput: undefined,
  handleSubmit: undefined,
  handleTagsChange: undefined,
  patternDataTags: undefined, 
  profile: undefined, 
  staticTags: undefined,
}

export default ProfileForm