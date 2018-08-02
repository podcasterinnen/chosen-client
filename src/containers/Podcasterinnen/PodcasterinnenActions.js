import {
  API_URL_PODCASTERINNEN_PROD,
} from '../../config/config'

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
    return fetch(API_URL_PODCASTERINNEN_PROD)
      .then(response => response.json())
      .then(json => dispatch(receivePodcasterinnen(json)))
      .catch((error) => console.log(error))
  }
}