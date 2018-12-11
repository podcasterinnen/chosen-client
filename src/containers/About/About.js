import React, { Component } from 'react'

import './About.css'

import photoDaniela from './daniela_400x400.jpg'
import photoMichaela from './michaela_400x400.jpg'
import photoNele from './nele_400x400.jpg'

class About extends Component {

  render() {
    return (
      <section className="about main__section">
        <h1>podcasterinnen.org</h1>
        <p>Wir, das Team von <a href="https://podcasterinnen.org">podcasterinnen.org</a>, haben es uns zur Aufgabe gemacht, Podcasterinnen sowie nicht-binäre Podcastende und ihre Formate sichtbarer zu machen.</p>
        <p>Ein erster Ansatz, um Frauen in der Podcast-Landschaft mehr Sichtbarkeit zu verleihen, waren die “Frauenstimmen im Netz”, eine Sammlung von Nele Heise, auf der heute über 500 Formate gelistet sind. Mit podcasterinnen.org gehen wir nun einen Schritt weiter. Nach dem Vorbild von <a href= "https://speakerinnen.org/" rel="noopener noreferrer" target="_blank">speakerinnen.org</a> möchten wir zum einen die Auffindbarkeit von nicht-binär Podcastende/Podcasterinnen über Themen und Inhalte vereinfachen. Und zum anderen möchten wir zeigen, dass es ab sofort keine Ausrede mehr gibt, einen Workshop, ein Podcast-Thema, Pressetexte, Talks oder Panels zum Thema Podcasts ausschließlich mit Männern zu besetzen (wie es in der Vergangenheit häufig der Fall war).</p>
        <h3>(Gehör) finden und gefunden werden</h3>
        <p>Dazu könnt ihr, als Podcasterin/nicht-binär Podcastende, euch auf dieser Webseite ein aussagekräftiges Profil anlegen und damit euch und eure Podcasts präsentieren. Besucher:innen von <a href="https://podcasterinnen.org">podcasterinnen.org</a> können hier nicht nur neue Formate entdecken, sondern auch Impulse und Ideen, z. B. für Veranstaltungen oder einzelne Podcast-Episoden mitnehmen. Die Seite richtet sich also auch an Podcaster:innen, die auf der Suche nach passenden Gesprächspartnerinnen sind, oder Veranstalter:innen, die mit Expertinnen zu bestimmten Themengebieten in Kontakt treten möchten.</p>
        <h2>Das Team hinter podcasterinnen.org sind:</h2>
        <div className="founder">
          <div className="founder__imagecontainer">
            <img className="founder__imagecontainer__image" src={photoDaniela} alt="Daniela Ishorst" />
          </div>
          <div>
            <h3>Daniela Ishorst – die Podcasterin.</h3>
            <p>Danielas Themenschwerpunkte im Podcast-Bereich sind Theater, Kunst und Literatur. Sie setzt sich mit podcasterinnen.org dafür ein, dass Frauen in Podcasts sowie bei Veranstaltungen zum Thema Podcasting sichtbarer werden.<br />Bei podcasterinnen.org arbeitet sie an den Inhalten, dem Design und der Organisation der Abläufe.</p>
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
            <p>Michaela gründete 2012 ihrer eigenen Firma Geil,Danke!, in der sie seitdem als Softwareentwicklerin arbeitet. Sie designt, programmiert und entwickelt eure Webseite und Datenbank, prüft eine Menge Code und hält die technischen Möglichkeiten im Blick.</p>
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
            <p>Nele ist Medienforscherin und beschäftigt sich seit 2013 mit der deutschsprachigen Podcast-Landschaft. Ein Tweet war Anstoß zur “Frauenstimmen im Netz”-Liste, auf der sie seit vier Jahren Podcasts von und mit Frauen sammelt und kuratiert. Dass aus diesem Impuls nun podcasterinnen.org entsteht, findet Nele “mega gut”.<br />Sie unterstützt Daniela und Michaela dabei, den Überblick über die vielfältigen Themen und Formate von Podcasterinnen zu behalten. Außerdem hat sie ein Auge darauf, dass Texte und redaktionelle Inhalte fehlerfrei auf unserer Webseite landen.</p>
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
