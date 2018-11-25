import {
  API_URL_PODCASTERINNEN,
} from '../../config/config'

import {
  LOCAL_STORAGE_USER_ID,
} from '../../utils/types'

const axios = require('axios')

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
    let data = new FormData()
    let id = object.id
    let file = object.avatar
    
    // remove avatar from profile object
    delete object.avatar
    data.append('podcaster', JSON.stringify(object))
    data.append('avatar', file)
    data.append('id', id)

    dispatch(editRequest(data))

    // Debug FormData:
    // for (const pair of data.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    
    return axios
      .put(`${API_URL_PODCASTERINNEN}${id}`, data, {
        withCredentials: true,
        headers: { 
          'cache-control': 'no-cache',
          'content-type': 'multipart/form-data',
        },
        mode: 'cors',
      })
      .then(response => {
        dispatch(editSuccess(response.data))
      })
      .catch((error) => {
        dispatch(editError(error))
      })
  }
}

export const initialiseProfile = (match) => {
  let userId
  if (match.path === '/profile') {
    userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
  } else if (match.params && match.params.id) {
    // userId = match.params.id
  } else {
    // TODO: handle error
  }
  return (dispatch) => {
    dispatch(requestProfile())
    return fetch(`${API_URL_PODCASTERINNEN}?user_id=${userId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveProfile(json)))
      .catch((error) => console.log(error))
  }
}