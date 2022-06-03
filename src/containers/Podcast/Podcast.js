import React, { useEffect, useState } from 'react'

import './Podcast.css'
import HeaderIllustration from '../../assets/images/podcast-header.svg'

const Podcast = () => {
  const [activeContributions, setActiveContributions] = useState(null)
  const [activeEpisode, setActiveEpisode] = useState(null)
  const [contributors, setContributors] = useState(null)
  const [episodes, setEpisodes] = useState(null)
  const [episodesData, setEpisodesData] = useState([])
  const [podcast, setPodcast] = useState(null)
  const [showList, setShowList] = useState(true)

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
    fetch('https://backend.podlovers.org/wp-json/podlove/v2/contributors')
      .then(res => res.json())
      .then(
        (result) => { setContributors(result.contributors) },
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

  useEffect(() => {
    console.log(activeEpisode)
    if (activeEpisode && contributors) {
      fetch(`https://backend.podlovers.org/wp-json/podlove/v2/episodes/${activeEpisode.id}/contributions`)
        .then(res => res.json())
        .then(
          (result) => {
            if (result && result.contributors) {
              const newActiveContributors = []
              result.contributors.forEach(contributor => {
                newActiveContributors.push(contributors.filter(c => c.id === contributor.contributor_id)[0])
              })
              setActiveContributions(newActiveContributors)
              console.log(newActiveContributors)
            }
          },
          (error) => { console.log(error) }
        )
    }
  }, [activeEpisode])
  
  return (
    <section className="podcast main__section">
      { podcast ?
        <div className="podcast__header">
          <h1 className="title podcast__title">
            <img
              className="podcast__illustration"
              src={HeaderIllustration}
            />
            { showList ? podcast.title : null }
          </h1>
          { showList ?
            <div>
              <h2 className="title--small podcast__subtitle">{podcast.subtitle}</h2>
              <h2 className="subtitle podcast__summary">{podcast.summary}</h2>
            </div> : null
          }
        </div> : null
      }
      { episodesData && episodesData.length > 0 && showList ?
        <div>
          { episodesData.map((episode, i) => 
            <div
              className="episode-wrapper"
              key={episode.id}
              onClick={() => {
                setShowList(false)
                setActiveEpisode(episode)
              }}
            >
              <div className="episode">
                <img
                  className="episode__cover"
                  src={episode.poster}
                />
                <div>
                  <p className="episode__title"><span>{episode.mnemonic}</span> – <span>{episode.title_clean}</span></p>
                  <p className="episode__duration">{episode.duration}</p>
                  <p className="episode__subtitle">{episode.subtitle}</p>
                </div>
              </div>
              { i < episodesData.length - 1 ?
                <div className="episode__separator" /> : null
              }
            </div>
          )}
        </div> : null
      }
      { !showList && activeEpisode ?
        <div>
          <div className="episode__header">
            <img
              className="episode__cover episode__cover--big"
              src={activeEpisode.poster}
            />
            <div className="episode__header__container">
              <p className="episode__duration">{activeEpisode.duration}</p>
              <p className="episode__title episode__title--big"><span>{activeEpisode.mnemonic}</span> – <span>{activeEpisode.title_clean}</span></p>
              { activeContributions && activeContributions.length > 0 ?
                <ul className="contributor-wrapper">
                  { activeContributions.map(contributor =>
                    <li>
                      <img
                        className="contributor__avatar"
                        src={contributor.avatar}
                      />
                      <p className="contributor__name">{contributor.nickname}</p>
                    </li>  
                  )}
                </ul> : null
              }
            </div>
          </div>
        </div> : null
      }
    </section>
  )
}

export default Podcast
