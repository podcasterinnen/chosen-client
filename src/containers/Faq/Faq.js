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
        <h2> Wer kann sich bei podcasterinnen.org ein Profil anlegen?</h2>
        <p>Jede Frau die einen eigenen Podcast produziert und/oder in einem festen Team podcastet kann sich bei uns ein Profil anlegen.</p>
        <h2>Wie melde ich mich bei podcasterinnen.org an?</h2>
        <p>Zuerst musst du dich mit deiner E-Mail-Adresse und einem <a href="http://www.sicherespasswort.com/" rel="noopener noreferrer" target="_blank">(möglichst sicheren)</a> Passwort registrieren. Du bekommst eine Bestätigungsmail die dich auf die Webseite <a href="https://podcasterinnen.org">podcasterinnen.org</a> zurück führt. Nun kannst du dich erneut anmelden und mit dem anlegen deines Profil beginnen.</p>
        <h2>Wie sieht ein gut ausgefülltes Profil aus?</h2>
        <p>Welche Informationen du in deinem Profil angeben möchtest, das ist letztlich ganz dir überlassen. Wir empfehlen dir aber die wichtigsten Schlagworte für deinen Podcast zu verwenden damit die Besucher:innen von podcasterinnen.org dich bzw. deine Podcasts schnell finden können.<br />Du kannst dein Profil jederzeit weiter bearbeiten und verändern. Eine ausführliche Anleitung zum Anlegen und Verwalten deines Profils findest du weiter unten (<a href="#">“Wie es geht”</a>).</p>
        <h2>Wann wird mein Profil freigeschaltet?</h2>
        <p>Es kann ein paar Tage dauern, bis wir dein Profil freigeschaltet haben, da wir ein sehr kleines Team sind.</p>
        <h2>Warum ist es überhaupt nötig mein Profil freischalten zu lassen?</h2>
        <p>Jede Podcasterin kann sich ihr persönliches Profil anlegen und dieses verwalten. Allerdings gibt es einen Ausschluss.Wir werden keinen Podcasterinnen bei uns eine Plattform bieten, die aus dem rechten Spektrum (AfD, Identitären, Pegida, etc) kommen oder mit ihrem Podcast rechte oder antisemitische Hetze verbreiten. Dies schließt auch Podcasterinnen mit ein, die sich in der “ProLife”-Bewegung engagieren.Menschenverachtung und rechter Hetze werden wir hier keinen Raum geben. Sollte euch ein solches Profil auffallen, meldet euch bitte bei uns per Mail: <a href="mailto:contact@podcasterinnen.org">contact@podcasterinnen.org</a></p>
        <h2>Warum gibt es meine Kategorie (meinen Tag, mein Schlagwort nicht) nicht?</h2>
        <p>Wir haben uns bewusst für “hardgecodete” Tags entschieden. Hier sind die alphabetisch sortierte Liste und eine <a href="#">Liste nach Themen als pdf</a>. für dich hinterlegt. Das heisst, alle Tags die du findest sind starr und können nicht verändert werden, ebenso können keine neuen Tags hinzugefügt werden. Das dient der Übersichtlichkeit. Zudem sind die Tags nur eine erste Einordnung deines Podcasts, bzw eine erste Übersicht bei der Suche. In deiner Beschreibung kannst du dann nochmal spezieller und genauer auf dich und deinen Podcast eingehen.</p>
        <h2>Wie kann ich euch unterstützen?</h2>
        <p>In erster Linie lebt eine solche Webseite davon, dass ihr sie nutzt. Schaut euch um, vernetzt und unterstützt euch. Tragt die Idee hinter podcasterinnen.org weiter. Erzählt Podcaster:innen, Veranstalter:innen das es diese Webseite gibt und was die Idee dahinter ist. Schreibt über uns. Erwähnt uns in euren Podcasts. Wir freuen uns über jedwede Unterstützung.<br />Du bist Entwicklerin und möchtest einen Beitrag zu podcasterinnen.org leisten? Melde dich gerne via Twitter oder Mail.<br /><a href="https://podcasterinnen.org">podcasterinnen.org</a> ist ein Open Source Projekt und kann immer Unterstützung gebrauchen. Im Großen wie im Kleinen. Auch kleine Bausteine können uns schon viel weiterhelfen. Also nur Mut.</p>
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
