import {
  API_URL_CONFIRM,
} from '../../config/config'

const CONFIRM_ERROR = 'CONFIRM_ERROR'
const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS'
const INITIALISE_CONFIRM = 'INITIALISE_CONFIRM'

export const confirmError = (error = 'no error message') => ({
  payload: error,
  type: CONFIRM_ERROR,
})

export const confirmSuccess = (response) => ({
  payload: response,
  type: CONFIRM_SUCCESS,
})

export const initialiseConfirm = () => ({
  type: INITIALISE_CONFIRM,
})

/**
 * ASYNC ACTIONS
 */

export const confirmEmail = (key) => {
  return (dispatch) => {
    const url = `${API_URL_CONFIRM}?key=${key}`
    return fetch(url, {
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 200) {
          return dispatch(confirmSuccess(response))
        } else {
          return dispatch(confirmError(response.statusText))
        }
      })
      .then((json) => {

      })
      .catch((error) => {
        dispatch(confirmError(error))
      })
  }
}