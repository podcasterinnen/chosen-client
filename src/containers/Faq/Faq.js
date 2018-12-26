import React, { Component } from 'react'

import './Faq.css'
import iconArrow from '../../assets/icons/baseline_expand_more_black_48dp.png'

import { content } from './Faq.data'

class Faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: null
    }
    this.handleClick = this.handleAccordeonClick.bind(this)
  }

  componentDidMount = () => {
    document.title = 'FAQs – podcasterinnen.org'
  }

  handleAccordeonClick = (selectedId) => {
    if (this.state.selectedId !== selectedId) {
      this.setState({ selectedId })
    } else {
      this.setState({ selectedId: null })
    }
  }

  render() {
    return (
      <section className="faq main__section">
        <h1>FAQs</h1>
        <p>Du hast Fragen zu podcasterinnen.org? Dann bist du hier genau richtig. Hier erklären wir die wichtigsten Punkte und Wissenswertes zur Nutzung der Seite. Falls wir etwas vergessen haben oder du weitere Fragen hast, nimm gerne mit uns <a href="mailto:contact@podcasterinnen.org">Kontakt</a> auf.</p>
        { content.map((faq) => {
          const isActive = faq.index === this.state.selectedId

          return (
            <div 
              className={isActive ? 'faq__accordeon faq__accordeon--active': 'faq__accordeon'} 
              key={faq.index}
              onClick={() => this.handleAccordeonClick(faq.index)}
            >
              <span className="faq__accordeon__icon"><img src={iconArrow}></img></span>
              <h3 className="faq__accordeon__headline" dangerouslySetInnerHTML={{ __html: faq.headline }}></h3>
              <p className="faq__accordeon__content" dangerouslySetInnerHTML={{ __html: faq.copy }}></p>
            </div>
          )
        })}
        <h2>In wenigen Schritten zu deinem Profil.</h2>
        <h3>1. Registrieren</h3>
        <p>Zuerst musst du dich bei podcasterinnen.org registrieren. Dafür klicke auf unserer Startseite auf den Button <strong>„Mitmachen“</strong>. Dort findest du den Login- und den Registrierungsbereich. Gib nun deinen Vornamen/Nickname an, deine E-Mail-Adresse und zwei Mal dein Passwort, welches mindestens 12 Zeichen haben muss. Dann klicke auf <strong>„Registrieren“</strong>.</p>
        <p>Du bekommst nun eine E-Mail an die von dir eingegebene Adresse mit einem Bestätigungslink. Klicke auf den Link und du wirst automatisch auf die Seite von podcasterinnen.org zurückgeleitet. Nun musst du dich einloggen. Diesmal gibst du also unter <strong>„Login“</strong> deine E-Mail-Adresse und dein Passwort ein. Jetzt kannst du mit dem Ausfüllen deines Profils beginnen.</p>
        <h3>2. Profil ausfüllen</h3>
        <p>Wir haben uns für wenige Pflichtfelder entschieden. Die Felder <strong>„Vorname/Nickname“</strong> und <strong>„Kurz-Biographie“</strong> müssen ausgefüllt sein; außerdem muss ein Podcast eintragen werden. Je mehr Informationen du in deinem Profil angibst, umso genauer können Veranstalter:innen und andere Podcaster:innen suchen und dich ebenfalls besser finden.</p>
        <p>Wenn du gerne anonym bleiben möchtest, bist du nicht gezwungen, deinen Klarnamen anzugeben, sondern kannst auf einen Nickname (zum Beispiel dein Twitter-Handle) zurückgreifen. Zu jedem Feld im Profilformular gibt es einen kleinen Tooltip. Wenn du mit der Maus über das Fragezeichen fährst, öffnet sich dieser und beschreibt dir in wenigen Worten, welche Informationen in dem jeweiligen Feld einzutragen sind.</p>
        <h3>3. Profil freischalten lassen</h3>
        <p>Wir erhalten bei jeder neuen Anmeldung eine Benachrichtigung. Das Team von podcasterinnen.org wird dein Profil – wenn es vollständig ausgefüllt ist – so schnell wie möglich freischalten. Weitere Änderungen, die du in deinem Profil angibst, müssen nicht mehr manuell von uns freigeschaltet werden, sondern erfolgen automatisch, sobald du sie gespeichert hast.</p>
        <h3>4. Kontaktiert werden</h3>
        <p>Bisher fehlt leider noch eines der wichtigsten Features: Die Kontaktaufnahme über podcasterinnen.org zu euch. Wir werden das Feature so schnell wie möglich implementieren. Da du aber sowohl die Webseite deines Podcasts als auch dein Twitter-Handle eintragen kannst, denken wir, dass Personen, die euch suchen, auf diesen Weg auf euch zukommen können. Wir wissen, dass das keine ideale Lösung ist, und arbeiten daran, die Situation einfacher und mit weniger Klicks zu gestalten. Wir möchten dich trotzdem darum bitten, weder deine E-Mail-Adresse noch deine Handynummer in deinem Profil anzugeben.</p>
      </section>
    )
  }
}

export default Faq
