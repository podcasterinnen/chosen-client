const defaultStore = {}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'RECEIVE_PODCASTERINNEN':
    const podcasterinnen = action.payload.data
    const publishedPodcasterinnen = []
    podcasterinnen.forEach((podcasterin) => {
      if (podcasterin.profile_state === 'PUBLISHED') {
        publishedPodcasterinnen.push(podcasterin)
      }
    })
    return {...store, podcasterinnen: publishedPodcasterinnen}
  case 'REQUEST_PODCASTERINNEN':
    return {...store}
  default:
    return {...store }
  }
}

export default reducer