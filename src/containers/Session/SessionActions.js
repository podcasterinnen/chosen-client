import {
  API_URL_FORGOT_PASSWORD,
  API_URL_REGISTER,
  API_URL_SESSIONS,
} from '../../config/config'

import {
  LOCAL_STORAGE_USER_ID,
} from '../../utils/types'

const INITIALISE_SESSION = 'INITIALISE_SESSION'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_REQUEST = 'REGISTER_REQUEST'
const SESSION_ERROR = 'SESSION_ERROR'
const SET_SESSION_STATE = 'SET_SESSION_STATE'

export const initialiseSession = (wasRedirected = false) => ({
  payload: wasRedirected,
  type: INITIALISE_SESSION,
})

export const forgotPasswordSuccess = (json) => ({
  payload: json,
  type: FORGOT_PASSWORD_SUCCESS,
})

export const forgotPasswordError = (error) => ({
  payload: error,
  type: FORGOT_PASSWORD_ERROR,
})

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
})

export const loginSuccess = (json) => ({
  payload: json,
  type: LOGIN_SUCCESS,
})

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
})

export const logoutSuccess = (json) => ({
  payload: json,
  type: LOGOUT_SUCCESS,
})

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
})

export const registerSuccess = (json) => ({
  payload: json,
  type: REGISTER_SUCCESS,
})

export const sessionError = (error) => ({
  payload: error,
  type: SESSION_ERROR,
})

export const setSessionState = (newState) => ({
  payload: newState,
  type: SET_SESSION_STATE,
})


/**
 * ASYNC ACTIONS
 */

export const loginUser = (emailAddress, password) => {
  return (dispatch) => {
    dispatch(loginRequest())
    const data = {
      session: {
        email: emailAddress,
        password: password,
        remember_me: true,
      }
    }
    return fetch(API_URL_SESSIONS, {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        localStorage.setItem(LOCAL_STORAGE_USER_ID, json.info.detail)
        return dispatch(loginSuccess(json))
      })
      .catch((error) => {
        dispatch(sessionError(error))
      })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest())
    return fetch(`${API_URL_SESSIONS}${localStorage.getItem(LOCAL_STORAGE_USER_ID)}`, {
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'DELETE',
      mode: 'cors',
    })
      .then(response => {
        localStorage.removeItem(LOCAL_STORAGE_USER_ID)
        return response.json()
      })
      .then(json => {
        return dispatch(logoutSuccess(json))
      })
      .catch((error) => {
        localStorage.removeItem(LOCAL_STORAGE_USER_ID)
        dispatch(sessionError(error))
      })
  }
}

export const registerNewUser = (emailAddress, forename, password) => {
  return (dispatch) => {
    dispatch(registerRequest())
    const data = {
      user: {
        email: emailAddress,
        password: password,
        podcasters: {
          forename: forename,
        },
      },
    }
    return fetch(API_URL_REGISTER, {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(json => dispatch(registerSuccess(json)))
      .catch((error) => {
        dispatch(sessionError(error))
      })
  }
}

export const forgotPassword = (emailAddress) => {
  return (dispatch) => {
    dispatch(forgotPasswordRequest())
    const data = {
      password_reset: {
        email: emailAddress,
      },
    }
    return fetch(API_URL_FORGOT_PASSWORD, {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    })
      .then(response => {
        return response.json()
      })
      .then(json => dispatch(forgotPasswordSuccess(json)))
      .catch((error) => {
        dispatch(forgotPasswordError(error))
      })
  }
}
