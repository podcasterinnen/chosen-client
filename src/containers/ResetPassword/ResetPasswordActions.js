import {
  API_URL_RESET_PASSWORD,
} from '../../config/config'

const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
const INITIALISE_RESET_PASSWORD = 'INITIALISE_RESET_PASSWORD'

export const resetPasswordError = (error = 'no error message') => ({
  payload: error,
  type: RESET_PASSWORD_ERROR,
})

export const resetPasswordSuccess = (response) => ({
  payload: response,
  type: RESET_PASSWORD_SUCCESS,
})

export const initialiseResetPassword = () => ({
  type: INITIALISE_RESET_PASSWORD,
})

/**
 * ASYNC ACTIONS
 */

export const resetPassword = (key, password) => {
  return (dispatch) => {
    const url = `${API_URL_RESET_PASSWORD}`
    const data = {
      password_reset: {
        key: key,
        password: password,
      },
    }
    return fetch(url, {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 200) {
          return dispatch(resetPasswordSuccess(response))
        } else {
          return dispatch(resetPasswordError(response.statusText))
        }
      })
      .catch((error) => {
        dispatch(resetPasswordError(error))
      })
  }
}