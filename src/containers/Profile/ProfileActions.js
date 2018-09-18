import {
  API_URL_PODCASTERINNEN,
} from '../../config/config'

import {
  LOCAL_STORAGE_USER_ID,
} from '../../utils/types'

const EDIT_ERROR = 'EDIT_ERROR'
const EDITING_PROFILE = 'EDITING_PROFILE'
const EDITING_QUIT = 'EDITING_QUIT'
const EDIT_REQUEST = 'EDIT_REQUEST'
const EDIT_SUCCESS = 'EDIT_SUCCESS'
const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
const REQUEST_PROFILE = 'REQUEST_PROFILE'

export const editError = (error) => ({
  payload: error,
  type: EDIT_ERROR,
})

export const editingProfile = () => ({
  type: EDITING_PROFILE,
})

export const editingQuit = () => ({
  type: EDITING_QUIT,
})

export const editRequest = (data) => ({
  payload: data,
  type: EDIT_REQUEST,
})

export const editSuccess = (json) => ({
  payload: json,
  type: EDIT_SUCCESS,
})

const receiveProfile = (json) => ({
  payload: json,
  type: RECEIVE_PROFILE,
})

const requestProfile = () => ({
  type: REQUEST_PROFILE
})

export const submitProfile = (object) => {
  return (dispatch) => {
    console.log('Object', object)
    let data = {}
    data.podcaster = {}
    Object.entries(object).forEach(([key, value]) => {
      if (value !== '' && typeof value === 'string') {
        data.podcaster[key] = value
      } else if (Array.isArray(value) && value.length > 0) {
        console.log('Array', value)
        data.podcaster[key] = []
        value.forEach((item, index) => {
          if (item.id) {
            delete item.id
          }
          data.podcaster[key].push(item)
        })
        console.log(data.podcaster[key])
      } else if (typeof value === 'boolean') {
        data.podcaster[key] = value
      }
    })
    dispatch(editRequest(data))
    console.log('Data', data)
    return fetch(`${API_URL_PODCASTERINNEN}63`, {
        body: JSON.stringify(data),
        'cache-control': 'no-cache',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        method: 'PUT',
        mode: 'cors',
      })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => dispatch(editSuccess(json)))
      .catch((error) => {
        console.log(error)
        dispatch(editError(error))
      })
  }
}

export const initialiseProfile = () => {
  return (dispatch) => {
    dispatch(requestProfile())
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
    return fetch(`${API_URL_PODCASTERINNEN}?user_id=${userId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveProfile(json)))
      .catch((error) => console.log(error))
  }
}