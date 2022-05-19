import React, { useEffect, useState } from 'react'

import './Podcast.css'

const Podcast = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    document.title = 'Podcast – podcasterinnen.org'
    fetch('https://backend.podlovers.org/wp-json/podlove/v2/podcast')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
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
    </section>
  )
}

export default Podcast
