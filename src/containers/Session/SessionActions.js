import {
  API_URL_SESSIONS_LOCALHOST,
} from '../../config/config'

import {
  LOCAL_STORAGE_USER_ID,
} from '../../utils/types'

const INITIALISE_SESSION = 'INITIALISE_SESSION'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_REQUEST = 'REGISTER_REQUEST'
const SET_SESSION_STATE = 'SET_SESSION_STATE'

export const initialiseSession = () => ({
  type: INITIALISE_SESSION,
})

const loginRequest = () => ({
  type: LOGIN_REQUEST,
})

const loginSuccess = (json) => ({
  payload: json,
  type: LOGIN_SUCCESS,
})

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
})

const logoutSuccess = (json) => ({
  payload: json,
  type: LOGOUT_SUCCESS,
})

const registerRequest = () => ({
  type: REGISTER_REQUEST,
})

const registerSuccess = (json) => ({
  payload: json,
  type: REGISTER_SUCCESS,
})

export const setSessionState = (newState) => ({
  payload: newState,
  type: SET_SESSION_STATE,
})

export const loginUser = (emailAddress, password) => {
  return (dispatch) => {
    dispatch(loginRequest())
    const data =  {
      session: {
        email: emailAddress,
        password: password,
      }
    }
    return fetch(API_URL_SESSIONS_LOCALHOST, {
        body: JSON.stringify(data),
        'cache-control': 'no-cache',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
      })
      .then(response => {
        console.log({response})
        return response.json()
      })
      .then(json => {
        console.log(json)
        localStorage.setItem(LOCAL_STORAGE_USER_ID, json.info.detail)
        return dispatch(loginSuccess(json))
      })
      .catch((error) => (console.log(error)))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest())
    return fetch(`${API_URL_SESSIONS_LOCALHOST}${localStorage.getItem(LOCAL_STORAGE_USER_ID)}`, {
        'cache-control': 'no-cache',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        method: 'DELETE',
        mode: 'cors',
      })
      .then(response => {
        console.log({response})
        localStorage.removeItem(LOCAL_STORAGE_USER_ID)
        return response.json()
      })
      .then(json => {
        console.log(json)
        return dispatch(logoutSuccess(json))
      })
      .catch((error) => (console.log(error)))
  }
}

export const registerNewUser = (emailAddress, forename, password) => {
  return (dispatch) => {
    dispatch(registerRequest())
    const data =  {
      user: {
        email: emailAddress,
        password: password,
        podcasters: {
          forename: forename,
        },
      }
    }
    return fetch(`https://chosen-cors-proxy.herokuapp.com/users/`, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        method: 'post',
        mode: 'cors',
      })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => dispatch(registerSuccess(json)))
      .catch((error) => (console.log(error)))
  }
}
