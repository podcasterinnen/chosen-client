const RECEIVE_PODCASTERINNEN = 'RECEIVE_PODCASTERINNEN'
const REQUEST_PODCASTERINNEN = 'REQUEST_PODCASTERINNEN'

const receivePodcasterinnen = (json) => ({
  payload: json,
  type: RECEIVE_PODCASTERINNEN,
})

const requestPodcasterinnen = () => ({
  type: REQUEST_PODCASTERINNEN,
})

export const initialisePodcasterinnen = () => {
  return (dispatch) => {
    dispatch(requestPodcasterinnen())
    return fetch(`https://chosen-cors-proxy.herokuapp.com/podcasters/`)
      .then(response => response.json())
      .then(json => dispatch(receivePodcasterinnen(json)))
  }
}