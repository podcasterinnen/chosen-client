const URL_PROD = 'podcasterinnen.org'
const URL_STAGING = 'test.podcasterinnen.org'

const hostname = window && window.location && window.location.hostname

let backendHost
switch (hostname) {
case URL_PROD:
  backendHost = 'https://api.podcasterinnen.org'
  break
case URL_STAGING:
  backendHost = 'https://apitest.podcasterinnen.org'
  break
default:
  backendHost = 'http://localhost:4000'
}

export const API_URL_CONFIRM = `${backendHost}/confirm`
export const API_URL_FORGOT_PASSWORD = `${backendHost}/password_resets/`
export const API_URL_PODCASTERINNEN = `${backendHost}/podcasters/`
export const API_URL_REGISTER = `${backendHost}/users/`
export const API_URL_RESET_PASSWORD = `${backendHost}/password_resets/update`
export const API_URL_SESSIONS = `${backendHost}/sessions/`
export const API_URL_UPLOADS = `${backendHost}`

export const SESSION_TIMEOUT = 1000 * 60 * 15
export const MIN_PASSWORD_LENGTH = 12

export const ENV_DEV = 'development'
export const ENV_STAGING = 'staging'
export const ENV_PROD = 'production'