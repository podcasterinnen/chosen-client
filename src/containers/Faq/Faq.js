import React, { Component } from 'react'

import './Faq.css'
import iconArrow from '../../assets/icons/baseline_expand_more_black_48dp.png'

const content = [{
  copy: 'Jede nicht-binäre Podcastende/Podcasterin die einen eigenen Podcast produziert und/oder in einem festen Team podcastet kann sich bei uns ein Profil anlegen.',
  index: 0,
  headline: 'Wer kann sich bei podcasterinnen.org ein Profil anlegen?',
}, {
  copy: 'Zuerst musst du dich mit deiner E-Mail-Adresse und einem <a href="http://www.sicherespasswort.com/" rel="noopener noreferrer" target="_blank">(möglichst sicheren)</a> Passwort registrieren. Du bekommst eine Bestätigungsmail die dich auf die Webseite <a href="https://podcasterinnen.org">podcasterinnen.org</a> zurück führt. Nun kannst du dich erneut anmelden und mit dem anlegen deines Profil beginnen.',
  index: 1,
  headline: 'Wie melde ich mich bei podcasterinnen.org an?',
}, {
  copy: 'Welche Informationen du in deinem Profil angeben möchtest, ist letztlich ganz dir überlassen. Wir empfehlen dir aber die wichtigsten Schlagworte für deinen Podcast zu verwenden damit die Besucher:innen von podcasterinnen.org dich bzw. deine Podcasts schnell finden können.<br/>Du kannst dein Profil jederzeit weiter bearbeiten und verändern. Eine ausführliche Anleitung zum anlegen und verwalten deines Profils findest du weiter unten „In wenigen Schritten zu deinem Profil“).',
  index: 2,
  headline: 'Wie sieht ein gut ausgefülltes Profil aus?',
}, {
  copy: 'Es kann ein paar Tage dauern, bis wir dein Profil freigeschaltet haben, da wir ein sehr kleines Team sind.',
  index: 3,
  headline: 'Wann wird mein Profil freigeschaltet?',
}, {
  copy: 'Jede Podcasterin/nicht-binäre Podcastende kann sich ihr persönliches Profil anlegen. Allerdings gibt es einen Ausschluss. Wir werden keinen Menschen bei uns eine Plattform bieten, die aus dem rechten Spektrum (AfD, Identitären, Pegida, etc) kommen oder mit ihrem Podcast rechte oder antisemitische Hetze verbreiten. Dies schließt auch Menschen mit ein, die sich in der „ProLife“-Bewegung engagieren. Menschenverachtung und rechter Hetze werden wir hier keinen Raum geben. Sollte dir ein solches Profil auffallen, melde dich bitte bei uns: <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a>.',
  index: 4,
  headline: 'Warum ist es überhaupt nötig mein Profil freischalten zu lassen?',
}, {
  copy: 'Wenn du dein Profil löschen möchtest, kannst du uns gerne eine E-Mail an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a> schicken. Wir löschen dein Profil sobald wir das nächste mal online sind.',
  index: 5,
  headline: 'Wie kann ich mein Profil löschen?',
}, {
  copy: 'Das hat vor allem etwas mit der Übersichtlichkeit der Seite zu tun.<br/>Wenn du dein Profil einrichtest, kannst du deinem Podcast verschiedenen Kategorien zuordnen. So wissen Besucher:innen deines Profils gleich, um welche Themen sich dein Format inhaltlich dreht und zu welchen Themen du gerne sprechen möchtest. Besucher:innen können nach Schlagw0rten suchen un dfinden sofort die passenden Profile zu ihrem Thema.<br/>Damit es schön praktisch und übersichtlich bleibt, haben wir uns für so genannte „hard coded tags” entschieden. Das heißt, die vorgegebenen Kategorien sind fix und können von dir nicht verändert oder um neue Schlagworte erweitert werden. Dadurch findest du vielleicht nicht die eine Kategorie bzw. „tags“, die dein Format perfekt beschreiben. Aber es erleichtert die Bedienung der Seite immens und stellt ohnehin nur eine erste grobe Einordnung deines Formats dar. In der Beschreibung auf deinem Profil kannst du nämlich noch viel spezieller und genauer auf dich und die Inhalte deines Podcasts eingehen. Wenn du findest, dass wir (trotz intensiver Recherche) eine ganz wichtige Themen-Kategorie vergessen haben und unbedingt ergänzen sollten, melde dich gerne bei uns.',
  index: 6,
  headline: 'Warum gibt es meine Kategorie (meinen Tag, mein Schlagwort) nicht?',
}, {
  copy: 'In erster Linie lebt eine solche Webseite davon, dass du sie nutzt und die Idee dahinter in die Welt trägst. Also: Schau dich um, vernetze dich und supporte andere nicht-binäre Podcastende und Podcasterinnen. Erzähl anderen, dass es diese Webseite gibt und warum sie sich hier anmelden sollten.<br/>Wir freuen uns über jedwede Form der ideellen Unterstützung. Erwähne podcasterinnen.org in deinem Podcasts. Schreib über uns. Erzähl Veranstalter:innen und allen, die podcastende Expertinnen zu einer riesigen Vielfalt an Themen suchen, dass sie hier fündig werden. Sharing is caring.<br/><a href="https://podcasterinnen.org">podcasterinnen.org</a> ist ein Open Source Projekt und kann immer auch technische Unterstützung gebrauchen - im Großen wie im Kleinen.<br/>Du bist Entwicklerin und möchtest einen Beitrag zu podcasterinnen.org leisten? Auch kleine Bausteine können uns schon weiterhelfen. Also nur Mut - melde dich gerne via Twitter oder Mail, wir freuen uns.',
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
    this.setState({ selectedId })
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
        <p>Zuerst musst du dich bei podacsterinnen.org registrieren. Dafür klicke auf unserer Startseite auf den Button „MITMACHEN“.“<br/>Dort findest du den Login- und den Registrierungsbereich. Gebe nun deinen Vornamen/Nickname an, deine E-Mail_Adresse und zwei Mal dein Passwort, welches mindestens 8 Zeichen haben muss. Dann klicke auf „REGISTRIEREN“.Du bekommst nun eine E-Mail an die angegebene Adresse mit einem Bestätigungslink. Du klickst auf den Link und wirst automatisch auf die Seite von podcasterinnen.org zurückgeleitet. Nun musst du dich einloggen. Diesmal gibst du also unter „LOGIN“ deine E-Mail-Adresse und dein Passwort ein. Jetzt kannst du mit dem Ausfüllen deines Profils beginnen.</p>
        <h3>2. Profil ausfüllen</h3>
        <p>Wir haben uns für wenige Pflichtfelder entschieden. Die Felder „Vorname/Nickname“ und „Kurz-Biographie“ müssen ausgefüllt sein, sowie mindestens ein Podcast eintragen werden. Je mehr Informationen du in deinem Profil angibst, umso genauer können Veranstalter:innen und andere Podcaster:innen suchen und dich ebenfalls besser finden.<br/>Wenn du gerne anonym bleiben möchtest bist du nicht gezwungen, deinen Klarnamen anzugeben, sondern kannst auf einen Nickname (vielleicht dein Twitterhandle) zurückgreifen.<br/>Zu jedem Feld im Profilformular gibt es kleine Tooltips. Wenn du mit der Maus über die Fragezeichen fährst öffnet sich dieser und beschreibt dir in wenigen Worten, welche Informationen in dem jeweiligen Feld einzutragen sind.</p>
        <h3>3. Profil freischalten lassen</h3>
        <p>Wir erhalten bei jeder neuen Anmeldung eine Benachrichtigung. Das Team von podcasterinnen.org wird dein Profil – wenn es vollständig ausgefüllt ist - so schnell wie möglich freischalten. Sobald dein Profil freigeschaltet wurde, erhältst du eine E-Mail.<br/> Weitere Änderungen die du in deinem Profil angibst, müssen nicht mehr manuell von uns freigeschaltet werden sondern erfolgen automatisch, sobald du sie gespeichert hast. </p>
        <h3>4. Gefunden werden</h3>
        <p>Bisher fehlt leider noch eins der wichtigsten Features: Die Kontaktaufnahme über podcasterinnen.org zu euch. Wir werden das Feature so schnell wie möglich implemetieren. Da ihr aber sowohl die Webseite eures Podcasts und auch eure Twitterhandle mit eintragen könnt, denken wir, dass die Leute, die euch suchen auf diesem Weg auf euch zukommen können. Wir wissen, dass das keine ideale Lösung ist und arbeiten daran, die Situation einfacher und mit weniger klicks zu gestalten. Wir möchten euch trotzdem darum bitten, weder eure E-Mail-Adresse noch eure Handynummer deswegen in eurem Profil mit anzugeben.</p>
      </section>
     )
  }
}

export default Faq
