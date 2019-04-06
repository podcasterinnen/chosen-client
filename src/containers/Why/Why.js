import React, { Component } from 'react'

import * as jingle from '../../assets/audio/the-patriarchy-jingle-buffering-the-vamipre-slayer.mp3'
import './Why.css'

class Why extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
      buttonLabel: 'Play',
      playState: 'stopped', // can be 'playing' or 'stopped'
    }
  }

  componentDidMount = () => {
    let audio = new Audio()
    audio.src = jingle
    audio.onended = () => {
      this.setState({ 
        buttonLabel: 'Play',
        playState: 'stopped',
      })
    }
    this.setState({ audio: audio })
  }

  playOrPauseJingle = () => {
    switch (this.state.playState) {
      case 'stopped':
        this.state.audio.play()
        this.setState({ 
          buttonLabel: 'Pause',
          playState: 'playing',
        })
        break
      case 'playing':
        this.state.audio.pause()
        this.setState({ 
          buttonLabel: 'Play',
          playState: 'stopped',
        })
        break
      default:
        return
    }
  }

  render() {
    const { playState } = this.state

    return (
      <section className="main__section">
        <h1 className="title">Why?!</h1>
        <button className={playState === 'playing' ? 'button button--cta why__button why__button--is-playing' : 'button button--cta why__button'} onClick={this.playOrPauseJingle}></button>
        <p>Es gibt viele Menschen, die uns inspirieren und motivieren. Neben Buffy gehören auf jeden Fall <a href="https://twitter.com/jennyowenyoungs" rel="noopener noreferrer" target="_blank">Jenny Owen Youngs</a> und <a href="https://twitter.com/kristinnoeline" rel="noopener noreferrer" target="_blank">Kristin Russo</a> dazu. Die beiden haben uns freundlicherweise ihren großartigen Jingle zur Verfügung gestellt, der für uns die beste und kürzeste Antwort auf die Frage ist, weshalb wir dieses Projekt überhaupt ins Leben gerufen haben ("The Patriarchy!"). Und weil wir den Jingle so sehr lieben und er in vielen Situationen so dermaßen angebracht erscheint, haben wir diese Seite erstellt.</p>
        <p>Kleiner Tipp: Wenn auch ihr den Jingle in passenden Momenten gerne abspielbereit bei euch haben möchtet, könnt ihr gerne diese Seite auf euren Smartphone-Homescreen ziehen. Oder aber ihr schaut auf der <a href="https://www.patreon.com/posts/jingle-alert-13134424" rel="noopener noreferrer" target="_blank">Patreon-Seite von Kristin und Jenny</a> vorbei und ladet ihn dort einfach direkt als MP3-Datei herunter. Viel Spaß!</p>
      </section>
    )
  }
}


export default Why
