import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Faq.css'
import { initialiseFaq } from './FaqActions'

class Faq extends Component {
  componentDidMount() {
    this.props.handleInitFaq()
  }

  render() {
    return (
      <section className="faq main__section">
        <h1>FAQs</h1>
        <p>Du hast Fragen zu podcasterinnen.org? Dann bist du hier genau richtig. Hier erklären wirdie wichtigsten Punkte und Wissenswertes zur Nutzung der Seite. Falls wir etwas vergessen haben oder du weitere Fragen hast, nimm gerne mit uns <a href="mailto:contact@podcasterinnen.org">Kontakt</a> auf. </p>
        <h2> Wer kann sich bei podcasterinnen.org ein Profil anlegen?</h2>
        <p>Jede Frau die einen eigenen Podcast produziert und/oder in einem festen Team podcastet kann sich bei uns ein Profil anlegen.</p>
        <h2>Wie melde ich mich bei podcasterinnen.org an?</h2>
        <p>Zuerst musst du dich mit deiner E-Mail-Adresse und einem <a href="http://www.sicherespasswort.com/" rel="noopener noreferrer" target="_blank">(möglichst sicheren)</a> Passwort registrieren. Du bekommst eine Bestätigungsmail die dich auf die Webseite <a href="https://podcasterinnen.org">podcasterinnen.org</a> zurück führt. Nun kannst du dich erneut anmelden und mit dem anlegen deines Profil beginnen.</p>
        <h2>Wie sieht ein gut ausgefülltes Profil aus?</h2>
        <p>Welche Informationen du in deinem Profil angeben möchtest, ist letztlich ganz dir überlassen. Wir empfehlen dir aber die wichtigsten Schlagworte für deinen Podcast zu verwenden damit die Besucher:innen von podcasterinnen.org dich bzw. deine Podcasts schnell finden können.<br/>Du kannst dein Profil jederzeit weiter bearbeiten und verändern. Eine ausführliche Anleitung zum anlegen und verwalten deines Profils findest du weiter unten (<a href="#">„In wenigen Schritten zu deinem Profil“</a>).</p>
        <h2>Wann wird mein Profil freigeschaltet?</h2>
        <p>Es kann ein paar Tage dauern, bis wir dein Profil freigeschaltet haben, da wir ein sehr kleines Team sind.</p>
        <h2>Warum ist es überhaupt nötig mein Profil freischalten zu lassen?</h2>
        <p>Jede Podcasterin kann sich ihr persönliches Profil anlegen. Allerdings gibt es einen Ausschluss. Wir werden keinen Podcasterinnen bei uns eine Plattform bieten, die aus dem rechten Spektrum (AfD, Identitären, Pegida, etc) kommen oder mit ihrem Podcast rechte oder antisemitische Hetze verbreiten. Dies schließt auch Podcasterinnen mit ein, die sich in der „ProLife“-Bewegung engagieren.Menschenverachtung und rechter Hetze werden wir hier keinen Raum geben. Sollte dir ein solches Profil auffallen, melde dich bitte bei uns: <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a></p>
        <h2>Wie kann ich mein Profil löschen?</h2>
        <p>Wenn du dein Profil löschen möchtest, kannst du uns gerne eine E-Mail an <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a> schicken. Wir löschen dein Profil sobald wir das nächste mal online sind.</p>
        <h2>Warum gibt es meine Kategorie (meinen Tag, mein Schlagwort) nicht?</h2>
        <p>Das hat vor allem etwas mit der Übersichtlichkeit der Seite zu tun.<br/>
        Wenn du dein Profil einrichtest, kannst du deinem Podcast verschiedenen Kategorien zuordnen. So wissen die Besucher:innen deines Profils gleich, um welche Themen sich dein Format inhaltlich dreht. Oder man kann direkt nach Podcasterinnen und Podcasts zu bestimmten Themen suchen. Die Schlagworte sind also ziemlich praktisch.<br/>
        Damit es schön praktisch und übersichtlich bleibt, haben wir uns für so genannte „hard coded tags” entschieden. Das heißt, die vorgegebenen Kategorien sind fix und können von dir nicht verändert oder um neue Schlagworte erweitert werden. Dadurch findest du vielleicht nicht die eine Kategorie bzw. „tags“, die dein Format perfekt beschreiben. Aber es erleichtert die Bedienung der Seite immens und stellt ohnehin nur eine erste grobe Einordnung deines Formats dar. In der Beschreibung auf deinem Profil kannst du nämlich noch viel spezieller und genauer auf dich und die Inhalte deines Podcasts eingehen.
        Wenn du findest, dass wir (trotz intensiver Recherche) eine ganz wichtige Themen-Kategorie vergessen haben und unbedingt ergänzen sollten, melde dich gerne bei uns.</p>
        <h2>Wie kann ich euch unterstützen?</h2>
        <p>In erster Linie lebt eine solche Webseite davon, dass du sie nutzt und die Idee dahinter in die Welt trägst. Also: Schau dich um, vernetze dich und supporte andere Podcasterinnen. Erzähl Podcasterinnen das es diese Webseite gibt und warum sie sich hier anmelden sollten.<br/>Wir freuen uns über jedwede Form der ideellen Unterstützung. Erwähne podcasterinnen.org in deinem Podcasts. Schreib über uns. Erzähl Veranstalter:innen und allen, die podcastende Expertinnen zu einer riesigen Vielfalt an Themen suchen, dass sie hier fündig werden. Sharing is caring.<br/><a href="https://podcasterinnen.org">podcasterinnen.org</a> ist ein Open Source Projekt und kann immer auch technische Unterstützung gebrauchen - im Großen wie im Kleinen.<br/>
        Du bist Entwicklerin und möchtest einen Beitrag zu podcasterinnen.org leisten? Auch kleine Bausteine können uns schon weiterhelfen. Also nur Mut - melde dich gerne via Twitter oder Mail, wir freuen uns.</p>
        <h1>In wenigen Schritten zu deinem Profil.</h1>
        <h2>1. Registrieren</h2>
        <p>Zuerst musst du dich bei podacsterinnen.org registrieren. Dafür klicke rechts oben auf den Menüpunkt „Login/Registrieren“<br/>Dort findest du den Login- und den Registrierungsbereich. Klicke auf „“Registrieren”“ und gebe deine Mailadresse sowie zweimal dein Passwort an, klick dann auf „Submit“.Du bekommst nun eine E-Mail an die angegebene Adresse mit einem Bestätigungslink. Du klickst auf den Link und wirst automatisch auf die Seite von podcasterinnen.org zurückgeleitet. Nun musst du dich einloggen. Diesmal gibst du also unter „Login“ deine E-Mail-Adresse und dein Passwort ein. Jetzt kannst du mit dem Ausfüllen deines Profils beginnen.</p>
        <h2>2. Profil ausfüllen</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        <h2>3. Referenzen angeben</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <h2>4. Profil freischalten lassen</h2>
        <p>Wir erhalten bei jeder neuen Anmeldung eine Benachrichtigung. Das Team von podcasterinnen.org wird dein Profil – wenn es vollständig ausgefüllt ist - so schnell wie möglich freischalten. Sobald dein Profil freigeschaltet wurde, erhältst du eine E-Mail.<br/> Weitere Änderungen die du in deinem Profil angibst, müssen nicht mehr manuell von uns freigeschaltet werden sondern erfolgen automatisch, sobald du sie gespeichert hast. </p>
        <h2>5. Gefunden werden</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitFaq: () => {
    dispatch(initialiseFaq())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Faq)
