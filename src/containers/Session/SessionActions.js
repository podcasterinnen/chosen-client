const INITIALISE_SESSION = 'INITIALISE_SESSION'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
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
    return fetch(`https://chosen-cors-proxy.herokuapp.com/session/`, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
        },
        method: 'post',
        mode: 'no-cors',
      })
      .then(response => response.json())
      .then(json => dispatch(loginSuccess(json)))
  }
}

export const registerNewUser = (emailAddress, forename, password) => {
  return (dispatch) => {
    dispatch(registerRequest())
    const data =  {
      email: emailAddress,
      podcasters: {
        forename: forename,
      },
      password: password,
    }
    return fetch(`https://chosen-cors-proxy.herokuapp.com/users/`, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
        },
        method: 'post',
        mode: 'no-cors',
      })
      .then(response => response.json())
      .then(json => dispatch(registerSuccess(json)))
  }
}