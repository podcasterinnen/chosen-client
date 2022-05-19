import React, { useEffect, useState } from 'react'

import './Podcast.css'
import HeaderIllustration from '../../assets/images/podcast-header.svg'

const Podcast = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [podcast, setPodcast] = useState([])

  useEffect(() => {
    document.title = 'Podcast – podcasterinnen.org'
    fetch('https://backend.podlovers.org/wp-json/podlove/v2/podcast')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          console.log(result)
          setPodcast(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  
  return (
    <section className="podcast main__section">
      { podcast ?
        <div className="podcast__header">
          <h1 className="title">
            <img
              className="podcast__illustration"
              src={HeaderIllustration}
            />
            {podcast.title}
          </h1>
          <h2 className="title--small">{podcast.subtitle}</h2>
          <h2 className="subtitle">{podcast.summary}</h2>
        </div> : null
      }
    </section>
  )
}

export default Podcast
