import React, { Component } from 'react'

import './Faq.css'
import iconArrow from '../../assets/icons/baseline_expand_more_black_48dp.png'

const content = [{
  copy: 'Jede nicht-binäre Podcastperson/Podcasterin, die einen eigenen Podcast produziert und/oder in einem festen Team podcastet, kann sich bei uns ein Profil anlegen.',
  index: 0,
  headline: 'Wer kann sich bei podcasterinnen.org ein Profil anlegen?',
}, {
  copy: 'Zuerst musst du dich mit deiner E-Mail-Adresse und einem <a href="http://www.sicherespasswort.com/" rel="noopener noreferrer" target="_blank">(möglichst sicheren)</a> Passwort registrieren. Du bekommst eine Bestätigungsmail, die dich auf die Website <a href="https://podcasterinnen.org">podcasterinnen.org</a> zurückführt. Nun kannst du dich erneut anmelden und mit dem Anlegen deines Profils beginnen.',
  index: 1,
  headline: 'Wie melde ich mich bei podcasterinnen.org an?',
}, {
  copy: 'Welche Informationen du in deinem Profil angeben möchtest, ist letztlich ganz dir überlassen. Wir empfehlen dir aber, die wichtigsten Schlagworte für deinen Podcast zu verwenden, damit die Besucher:innen von podcasterinnen.org dich bzw. deine Podcasts schnell finden können.<br/>Du kannst dein Profil jederzeit weiter bearbeiten und verändern. Eine ausführliche Anleitung zum Anlegen und Verwalten deines Profils findest du weiter unten („In wenigen Schritten zu deinem Profil“).',
  index: 2,
  headline: 'Wie sieht ein gut ausgefülltes Profil aus?',
}, {
  copy: 'Es kann ein paar Tage dauern, bis wir dein Profil freigeschaltet haben, da wir ein sehr kleines Team sind.',
  index: 3,
  headline: 'Wann wird mein Profil freigeschaltet?',
}, {
  copy: 'Jede Podcastperson kann sich ihr persönliches Profil anlegen. Allerdings gibt es einen Ausschluss: Wir werden keinen Menschen bei uns eine Plattform bieten, die aus dem rechten Spektrum (AfD, Identitäre Bewegung, Pegida etc.) kommen oder mit ihrem Podcast rechte oder antisemitische Hetze verbreiten. Menschenverachtung, Sexismus und rechter Hetze werden wir hier keinen Raum geben. Sollte dir ein solches Profil auffallen, melde dich bitte bei uns: <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a>.',
  index: 4,
  headline: 'Warum ist es überhaupt nötig mein Profil freischalten zu lassen?',
}, {
  copy: 'Wenn du dein Profil löschen möchtest, kannst du uns gerne eine E-Mail an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a> schicken. Wir führen die Löschung des Profils so schnell als möglich durch.',
  index: 5,
  headline: 'Wie kann ich mein Profil löschen?',
}, {
  copy: 'Das hat vor allem etwas mit der Übersichtlichkeit der Seite zu tun. Wenn du dein Profil einrichtest, kannst du deinem Podcast verschiedenen Kategorien zuordnen. So wissen Besucher:innen deines Profils gleich, um welche Themen sich dein Format inhaltlich dreht und zu welchen Themen du gerne sprechen möchtest. Besucher:innen können nach Schlagworten suchen und finden sofort die passenden Profile zu ihrem Thema.</p><p>Damit es schön praktisch und übersichtlich bleibt, haben wir uns für so genannte „hard coded tags” entschieden. Das heißt, die vorgegebenen Kategorien sind fix und können von dir nicht verändert oder um neue Schlagworte erweitert werden. Dadurch findest du vielleicht nicht die eine Kategorie bzw. „tags“, die dein Format perfekt beschreiben. Aber es erleichtert die Bedienung der Seite immens und stellt ohnehin nur eine erste grobe Einordnung deines Formats dar. In der Beschreibung auf deinem Profil kannst du nämlich noch viel spezieller und genauer auf dich und die Inhalte deines Podcasts eingehen. Wenn du findest, dass wir (trotz intensiver Recherche) eine ganz wichtige Themen-Kategorie vergessen haben und unbedingt ergänzen sollten, dann schreibe uns doch einfach <a href="https://github.com/podcasterinnen/chosen-client/issues/161" target="_blank">hier auf Github einen Kommentar</a>.',
  index: 6,
  headline: 'Warum gibt es meine Kategorie (meinen Tag, mein Schlagwort) nicht?',
}, {
  copy: 'In erster Linie lebt eine solche Webseite davon, dass du sie nutzt und die Idee dahinter in die Welt trägst. Also: Schau dich um, vernetze dich und supporte andere Podcastpersonen und Podcasterinnen. Erzähl anderen, dass es diese Webseite gibt und warum sie sich hier anmelden sollten.</p><p>Wir freuen uns über jedwede Form der ideellen Unterstützung. Erwähne podcasterinnen.org in deinen Podcasts. Schreib über uns. Erzähl Veranstalter:innen und allen, die podcastende Expert*innen zu einer riesigen Vielfalt an Themen suchen, dass sie hier fündig werden. Sharing is caring.</p><p><a href="https://podcasterinnen.org">podcasterinnen.org</a> ist ein Open-Source-Projekt und kann immer auch technische Unterstützung gebrauchen - im Großen wie im Kleinen. Du kannst entwickeln/programmieren und möchtest einen Beitrag zu podcasterinnen.org leisten? Auch kleine Bausteine können uns schon weiterhelfen. Also nur Mut - melde dich gerne via <a href="https://twitter.com/podcasterinnen" target="_blank">Twitter</a> oder <a href="mailto:contact@podcasterinnen.org">E-Mail</a>, wir freuen uns. Natürlich kannst du auch direkt mit Programmieren loslegen. Den Sourcecode für das <a href="https://github.com/podcasterinnen/chosen-api" target="_blank">Backend</a> und das <a href="https://github.com/podcasterinnen/chosen-client" target="_blank">Frontend</a> findest du auf unserer <a href="https://github.com/podcasterinnen/" target="_blank">Github-Seite</a>. Wir freuen uns über Bug-Tickets, Verbesserungsvorschläge und Pull-Requests.',
  index: 7,
  headline: 'Wie kann ich euch unterstützen?',
}]

class Faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: null
    }
    this.handleClick = this.handleAccordeonClick.bind(this)
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
        <h1>In wenigen Schritten zu deinem Profil.</h1>
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
