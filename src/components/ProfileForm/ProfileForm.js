import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import { API_URL_UPLOADS } from '../../config/config'
import Tooltip from '../Tooltip/Tooltip'

import './ProfileForm.css'
import iconTrash from'../../assets/icons/baseline_delete_white_18dp.png'

class ProfileForm extends Component {
  
  render() {
    const { 
      bioShortCharactersRemaining,
      handleAddLanguagesInput,
      handleAddPodcastsInput,
      handleAddReferencesInput,
      handleAvatarDrop,
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
      handleSubmit,
      handleTagsChange,
      profile, 
      staticTags,
    } = this.props

    return(
      <div>
        { (profile && profile.bio_short && profile.podcasts.length) &&
        <button className="button button--decent profile-form__button-edit" onClick={handleEditToggle}>Bearbeiten beenden</button>
        }
        { (!profile || !profile.bio_short || !profile.podcasts.length) &&
          <div className="profile-form__banner">
            <p className="profile-form__banner__text">Es sieht so aus als wäre dein Profil noch nicht ausgefüllt. Beginne doch damit, dein Podcasterinnen-Profil zu vervollständigen.</p>
          </div>
        }
        <h2>Bearbeite dein Profil:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="profile__avatar-dropzone">
            <label>
              Profilbild
            </label>
            <Dropzone
              onDrop={(files) => handleAvatarDrop(files)}
            >
              <div className="profile__avatar profile__avatar--form" style={(profile.avatar !== null && profile.avatar !== '') ? {backgroundImage: `url(${API_URL_UPLOADS}${profile.avatar})`} : {backgroundImage: 'none'}}>
                { (profile.avatar === null || profile.avatar === '') &&
                <p className="profile__avatar__placeholder">Zieh dein Profilbild hier hinein oder klicke hier, um dein Profilbild hochzuladen.</p>
                }
              </div>
            </Dropzone>
          </div>
          <div>
            <label>
              Vorname/Nickname
              <Tooltip content="Hier trägst du deinen Vornamen ein. Wenn du deinen Klarnamen nicht verwenden möchtest, kannst auch ein Nickname eintragen. Er sollte von dir nur so gewählt werden, dass du auch gefunden werden kannst."></Tooltip>
            </label>
            <input 
              autoComplete="given-name"
              onChange={(e) => handleChange(e, 'forename')} 
              placeholder="Vorname" 
              type="text"
              value={profile.forename || ''}
            />
          </div>
          <div>
            <label>
              Nachname
              <Tooltip content="Dieses Feld ist optional. Das heißt, du kannst deinen Nachnamen angeben wenn du möchtest. Wenn du nur deinen Nickname verwenden möchtest, ist das völlig in Ordnung."></Tooltip>
            </label>
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
              <Tooltip content="In diesem Feld stehen dir 255 Zeichen zur Verfügung. Du kannst dich, deinen Podcast hier kurz und knapp vorstellen. Für ausführlicherer Beschreibungen ist in den nächsten Feldern Platz."></Tooltip>
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
            <label>
              Über mich
              <Tooltip content="Hier kannst du etwas über deine Person schreiben. Alles was wichtig ist über dich und deine Tätigkeiten zu wissen kannst du hier rein schreiben."></Tooltip>
            </label>
            <textarea 
              onChange={(e) => handleChange(e, 'bio_long')} 
              placeholder="Über mich" 
              rows="6"
              value={profile.bio_long || ''}
            ></textarea>
          </div>
          <div className="profile-form__tags">
            <label className="profile-form__tags__label">
              Themen, über die ich spreche:
              <Tooltip content="Dies sind deine Podcastthemen und Themen über die du darüberhinaus sprechen möchtest, zum Beispiel als Gästin in einem anderen Podcast oder bei einem Workshop/Vortrag. Dir stehen viele Tags zur Verfügung, die versuchen sollen, deine Themen so gut wie möglich abzudecken."></Tooltip>
            </label>
            { staticTags.map((staticTag, index) => (
              <label
                className="profile-form__tag"
                key={index}
              >
                <input
                  className="profile-form__tag__checkbox"
                  key={index}
                  onChange={handleTagsChange(index)}
                  type="checkbox"
                  checked={(profile.tags.indexOf(staticTag) > -1) ? 'checked' : ''}
                ></input>
                <div
                  className="profile-form__tag__label"
                >{staticTag}</div>
              </label>
            ))}
          </div>
          <div>
            <label>
              Sprachen
              <Tooltip content="Hier kann du die Sprachen eintragen in denen du podcasten und zum Beispiel Vorträge halten kannst/möchtest."></Tooltip>
            </label>
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
                  className="button button--icon profile__button--delete"
                  onClick={handleRemoveLanguagesInput(index)}
                  tabIndex="-1"
                >
                  <img src={iconTrash}></img>
                </button>
              </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddLanguagesInput(e)}
              tabIndex="-1"
            >Weitere Sprache hinzufügen</button>
          </div>
          <div>
            <h3 className="profile__subheadline">Podcasts</h3>
            { profile.podcasts && profile.podcasts.length && profile.podcasts.map((podcast, index) => (
              <div className="profile-form__multi-input-container" key={index}>
                <label>
                  Name des Podcasts
                  <Tooltip content="Trage den Namen deines Podcasts hier ein."></Tooltip>
                </label>
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
                  Kurze Beschreibung des Podcasts (max. 144 Zeichen)
                  <Tooltip content="Hier kannst du deinen Podcast in wenigen Worten beschreiben."></Tooltip>
                </label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="podcasts-data"
                  maxLength="144"
                  onChange={handlePodcastsDescriptionChange(index)}
                  placeholder="Kurze Beschreibung des Podcasts (max. 144 Zeichen)"
                  type="text"
                  value={podcast.description}
                />
                <label>Link zur Webseite des Podcasts</label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="podcasts-data"
                  onChange={handlePodcastsUrlChange(index)}
                  placeholder="z.B. https://podcasterinnen.org"
                  type="url"
                  value={podcast.url}
                />
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemovePodcastsInput(index)}
                  tabIndex="-1"
                >
                  <img src={iconTrash}></img></button>
                </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddPodcastsInput(e)}
              tabIndex="-1"
            >Weiteren Podcast hinzufügen</button>
            <Tooltip content="Du hast mehr als einen Podcast? Kein Problem. Füge einen weiteren hinzu und gebe wie zuvor den Namen, die Beschreibung und den Link ein."></Tooltip>
          </div>
          <div>
            <h3 className="profile__subheadline">
              Referenzen
              <Tooltip content="Du hast bereits Vorträge gehalten oder sasst auf einem Panel das aufgezeichnet wurde? Du kannst diese hier in den Referenzen eintragen."></Tooltip>
            </h3>
            { profile.references && profile.references.length && profile.references.map((reference, index) => (
              <div className="profile-form__multi-input-container" key={index}>
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
                <label>Link zu deiner Referenz</label>
                <input
                  autoComplete="off"
                  className="profile__input--multi"
                  list="references-data"
                  onChange={handleReferencesUrlChange(index)}
                  placeholder="z.B. https://podcasterinnen.org"
                  type="url"
                  value={reference.url}
                />
                <button
                  className="button button--decent button--icon profile__button--delete"
                  onClick={handleRemoveReferencesInput(index)}
                  tabIndex="-1"
                >
                  <img src={iconTrash}></img></button>
                </div>
            ))}
            <button 
              className="button profile__button--add"
              onClick={(e) => handleAddReferencesInput(e)}
              tabIndex="-1"
            >Weitere Referenz hinzufügen</button>
          </div>
          <div>
            <h3 className="profile__subheadline">
              Dazu kann man mich anfragen:
              <Tooltip content="Hier kannst, durch anklicken der Checkbox, angeben, für was du angefragt werden möchtest. Bzw. was deine Skills im Podcastbereich sind."></Tooltip>
            </h3>
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
            <h3 className="profile__subheadline">
              Weitere Infos über mich:
              <Tooltip content="Wenn du magst, zeig den Menschen die eine Podcasterin suchen, wo du wohnst, wo du auf Twitter zu finden bist und deine Webseite."></Tooltip>
            </h3>
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
                placeholder="dein_twitter_handle" 
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
  handleAvatarDrop: PropTypes.func,
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
  handleSubmit: PropTypes.func,
  handleTagsChange: PropTypes.func,
  profile: PropTypes.object, 
  staticTags: PropTypes.array,
}
ProfileForm.defaultProps = {
  bioShortCharactersRemaining: undefined,
  handleAddLanguagesInput: undefined,
  handleAddPodcastsInput: undefined,
  handleAddReferencesInput: undefined,
  handleAvatarDrop: undefined,
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
  handleSubmit: undefined,
  handleTagsChange: undefined,
  profile: undefined, 
  staticTags: undefined,
}

export default ProfileForm