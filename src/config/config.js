const URL_PROD = 'podcasterinnen.org'
const URL_STAGING = 'staging.podcasterinnen.org'

const hostname = window && window.location && window.location.hostname

let backendHost

if (hostname === URL_PROD || hostname === URL_STAGING) {
  backendHost = 'https://chosen-cors-proxy.herokuapp.com'
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:4000'
  // backendHost = 'https://chosen-cors-proxy.herokuapp.com'
}

export const API_URL_CONFIRM = `${backendHost}/confirm`
export const API_URL_REGISTER = `${backendHost}/users/`
export const API_URL_SESSIONS = `${backendHost}/sessions/`
export const API_URL_PODCASTERINNEN = `${backendHost}/podcasters/`
export const API_URL_UPLOADS = `${backendHost}`