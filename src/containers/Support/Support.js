import React, { Component } from 'react'

import './Support.css'

class Support extends Component {

  componentDidMount = () => {
    document.title = 'Support – podcasterinnen.org'
  }

  render() {
    return (
      <section className="support main__section">
        <h1 className="support__headline">podcasterinnen.org unterstützen</h1>
        <p>podcasterinnen.org ist ein ehrenamtliches Projekt. Wir arbeiten gerne daran. Trotzdem entstehen uns Kosten. 
Die Domains kosten Geld. Das Hosting kostet Geld. Die Teilnahme an Konferenzen kostet Geld. Die Arbeit/Verbesserung an der Plattform kostet Geld. Wenn ihr uns bei unserer Arbeit unterstützen möchtet, freuen wir uns darüber.</p>
        <p>Ihr könnt uns finanziell mit einer Spende oder einem Dauerauftrag unterstützen:</p>
        <p className="support__strong">Daniela Ishorst</p>
        <p className="support__strong">IBAN: DE31 3005 0110 1008 1417 05</p>
        <p className="support__strong">Verwendungszweck: podcasterinnen.org</p>
        <p>(Bitte gebe unbedingt den Verwendungszweck mit an, da wir dieses Konto ebenfalls für Unterstützer:innen bei kunst & horst nutzen.)</p>
        <p>Natürlich bleibt podcasterinnen.org ein kostenloses Angebot.</p>
        <p>Ihr könnt uns außerdem unterstützen, indem ihr von podcasterinnen.org berichtet. Egal ob ihr in eurem Blog oder Podcast davon berichtet, befreundete Podcaster*innen aufmerksam macht oder podcasterinnen.org bei Social Media teilt – wir freuen uns.</p>
      </section>
    )
  }
}

export default Support
