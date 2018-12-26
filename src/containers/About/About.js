import React, { Component } from 'react'

import './About.css'

import photoDaniela from './daniela_400x400.jpg'
import photoMichaela from './michaela_400x400.jpg'
import photoNele from './nele_400x400.jpg'

class About extends Component {
  
  componentDidMount = () => {
    document.title = 'Über uns  – podcasterinnen.org'
  }

  render() {
    return (
      <section className="about main__section">
        <h1>podcasterinnen.org</h1>
        <p>Wir, das Team von <a href="https://podcasterinnen.org">podcasterinnen.org</a>, haben es uns zur Aufgabe gemacht, Podcasterinnen sowie nicht-binäre Podcastende und ihre Formate sichtbarer zu machen.</p>
        <p>Ein erster Ansatz, um Frauen in der Podcast-Landschaft mehr Sichtbarkeit zu verleihen, waren die „Frauenstimmen im Netz”, eine Sammlung von Nele Heise, auf der heute über 500 Formate gelistet sind. Mit podcasterinnen.org gehen wir nun einen Schritt weiter: Nach dem Vorbild von <a href= "https://speakerinnen.org/" rel="noopener noreferrer" target="_blank">speakerinnen.org</a> möchten wir zum einen die Auffindbarkeit von nicht-binären Podcastpersonen und Podcasterinnen über Themen und Inhalte vereinfachen. Und zum anderen möchten wir zeigen, dass es ab sofort keine Ausrede mehr gibt, einen Workshop, ein Podcast-Thema, Pressetexte, Talks oder Panels zum Thema Podcasts ausschließlich mit Männern zu besetzen (wie es in der Vergangenheit häufig der Fall war).</p>
        <h3>(Gehör) Finden und gefunden werden</h3>
        <p>Dazu könnt ihr euch als Podcasterin oder Podcastperson auf dieser Webseite ein aussagekräftiges Profil anlegen und damit euch und eure Podcasts präsentieren. Besucher:innen von <a href="https://podcasterinnen.org">podcasterinnen.org</a> können hier nicht nur neue Formate entdecken, sondern auch Impulse und Ideen z. B. für Veranstaltungen oder einzelne Podcast-Episoden mitnehmen. Die Seite richtet sich also auch an Podcaster:innen, die auf der Suche nach passenden Personen für ein Gespräch sind, oder Veranstalter:innen, die mit Personen in Kontakt treten möchten, die auf bestimmten Themengebieten Expertise besitzen.</p>
        <h2>Die Personen hinter podcasterinnen.org:</h2>
        <div className="founder">
          <div className="founder__imagecontainer">
            <img className="founder__imagecontainer__image" src={photoDaniela} alt="Daniela Ishorst" />
          </div>
          <div>
            <h3>Daniela Ishorst – die Podcasterin.</h3>
            <p>Danielas Themenschwerpunkte im Podcast-Bereich sind Theater, Kunst, Kultur und Literatur. Sie setzt sich mit podcasterinnen.org dafür ein, dass Podcasterinnen und Podcastpersonen in Podcasts sowie bei Veranstaltungen zum Thema Podcasting sichtbarer werden.<br />Bei podcasterinnen.org arbeitet sie an den Inhalten, dem Design und der Organisation der Abläufe.</p>
            <ul>
              <li>Twitter: <a href="https://twitter.com/die_horst" rel="noopener noreferrer" target="_blank">@die_horst</a></li>
              <li>Podcast: <a href="http://www.kunstundhorst.de" rel="noopener noreferrer" target="_blank">kunst & horst</a></li>
            </ul>
          </div>
        </div>
        <div className="founder">
          <div className="founder__imagecontainer">
            <img className="founder__imagecontainer__image "src={photoMichaela} alt="Michaela Lehr" />
          </div>
          <div>
            <h3>Michaela Lehr – die Entwicklerin.</h3>
            <p>Michaela gründete 2012 ihre eigene Firma „Geil,Danke!”, in der sie seitdem als Softwareentwicklerin arbeitet. Sie designt, programmiert und entwickelt eure Webseite und Datenbank, prüft eine Menge Code und hält die technischen Möglichkeiten im Blick.</p>
            <ul>
              <li>Twitter: <a href="https://twitter.com/fischaelameer" rel="noopener noreferrer" target="_blank">@fischaelameer</a></li>
              <li>Webseite: <a href="https://geildanke.com" rel="noopener noreferrer" target="_blank">geildanke.com</a></li>
            </ul>
          </div>
        </div>
        <div className="founder">
          <div className="founder__imagecontainer">
            <img className="founder__imagecontainer__image"src={photoNele} alt="Nele Heise" />
          </div>
          <div>
            <h3>Nele Heise – die Stimme aus dem Off.</h3>
            <p>Nele ist Medienforscherin und beschäftigt sich seit 2013 mit der deutschsprachigen Podcast-Landschaft. <br />Sie unterstützt Daniela und Michaela dabei, den Überblick über die vielfältigen Themen und Formate von Podcasterinnen und Podcastpersonen zu behalten. Außerdem hat sie ein Auge darauf, dass Texte und redaktionelle Inhalte fehlerfrei auf unserer Webseite landen.</p>
            <ul>
              <li>Twitter: <a href="https://twitter.com/neleheise" rel="noopener noreferrer" target="_blank">@neleheise</a></li>
              <li>Webseite: <a href="http://www.neleheise.de/" rel="noopener noreferrer" target="_blank">neleheise</a></li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default About
