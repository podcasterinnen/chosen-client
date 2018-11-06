let backendHost
const hostname = window && window.location && window.location.hostname;

if (hostname === 'chosen-client.herokuapp.com/') {
  backendHost = 'https://chosen-cors-proxy.herokuapp.com'
} else {
  // backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:4000'
  backendHost = 'https://chosen-cors-proxy.herokuapp.com'
}

export const API_URL_REGISTER = `${backendHost}/users/`
export const API_URL_SESSIONS = `${backendHost}/sessions/`
export const API_URL_PODCASTERINNEN = `${backendHost}/podcasters/`