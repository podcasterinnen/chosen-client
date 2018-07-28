const INITIALISE_SESSION = 'INITIALISE_SESSION'
const SET_SESSION_STATE = 'SET_SESSION_STATE'

export const initialiseSession = () => ({
  type: INITIALISE_SESSION,
})

export const setSessionState = (newState) => ({
  payload: newState,
  type: SET_SESSION_STATE,
})