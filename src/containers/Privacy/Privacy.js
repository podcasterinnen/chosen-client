import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Privacy.css'
import { initialisePrivacy } from './PrivacyActions'

class Privacy extends Component {
  componentDidMount() {
    this.props.handleInitPrivacy()
  }

  render() {
    return (
      <section className="main__section">
        <h1>Datenschutz</h1>
        <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
        <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.<br />Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.</p>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleInitPrivacy: () => {
    dispatch(initialisePrivacy())
  }
})


export default connect(
  null,
  mapDispatchToProps
)(Privacy)
