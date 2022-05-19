import React, { useEffect, useState } from 'react'

import './Podcast.css'
import HeaderIllustration from '../../assets/images/podcast-header.svg'

const Podcast = () => {
  const [episodes, setEpisodes] = useState(null)
  const [episodesData, setEpisodesData] = useState([])
  const [podcast, setPodcast] = useState(null)

  useEffect(() => {
    document.title = 'Podcast – podcasterinnen.org'
    fetch('https://backend.podlovers.org/wp-json/podlove/v2/podcast')
      .then(res => res.json())
      .then(
        (result) => { setPodcast(result) },
        (error) => { console.log(error) }
      )
    fetch('https://backend.podlovers.org/wp-json/podlove/v2/episodes')
      .then(res => res.json())
      .then(
        (result) => { setEpisodes(result.results) },
        (error) => { console.log(error) }
      )
  }, [])

  useEffect(() => {
    if (episodes && episodes.length > 0) {
      const promises = []
      episodes.forEach(episode => {
        const promise = fetch(`https://backend.podlovers.org/wp-json/podlove/v2/episodes/${episode.id}`)
          .then(res => res.json())
          .then(
            (result) => result,
            (error) => { console.log(error) }
          )
        promises.push(promise)
      })
      Promise.all(promises).then(res => setEpisodesData(res))
    }
  }, [episodes])

  useEffect(() => {
    console.log(episodesData)
  }, [episodesData])
  
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
      { episodesData && episodesData.length > 0 ?
        <div>
          { episodesData.map(episode => 
            <div
              key={episode.id}
              className="episode"
            >
              <img
                className="episode__cover"
                src={episode.poster}
              />
              <div>
                <p><span>{episode.mnemonic}</span> – <span>{episode.title_clean}</span></p>
                <p>{episode.duration}</p>
                <p>{episode.subtitle}</p>
              </div>
            </div>
          )}
        </div> : null
      }
    </section>
  )
}

export default Podcast
