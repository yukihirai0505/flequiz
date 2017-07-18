import {api as API} from 'Config'
import {CALL_API} from '../middlewares/ApiClient'
import AuthRecord from '../records/Auth'

// Action types
export const REQUEST_USERS_ME_GET = 'REQUEST_USERS_ME_GET'
export const SUCCESS_USERS_ME_GET = 'SUCCESS_USERS_ME_GET'
export const FAILED_USERS_ME_GET = 'FAILED_USERS_ME_GET'

export const REQUEST_USERS_ME_UPDATE = 'REQUEST_USERS_ME_UPDATE'
export const SUCCESS_USERS_ME_UPDATE = 'SUCCESS_USERS_ME_UPDATE'
export const FAILED_USERS_ME_UPDATE = 'FAILED_USERS_ME_UPDATE'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const REMOVE_AUTH_TOKEN = 'REMOVE_AUTH_TOKEN'


// Action
export const getMe = (token) => {
  return {
    [CALL_API]: {
      api: API.methods.getMe,
      requestTypes: [REQUEST_USERS_ME_GET],
      successTypes: [SUCCESS_USERS_ME_GET],
      failedTypes: [FAILED_USERS_ME_GET],
      token: token
    }
  }
}

export const updateMe = (data, token) => {
  return {
    [CALL_API]: {
      api: API.methods.updateMe,
      requestTypes: [REQUEST_USERS_ME_UPDATE],
      successTypes: [SUCCESS_USERS_ME_UPDATE],
      failedTypes: [FAILED_USERS_ME_UPDATE],
      body: data,
      token: token
    }
  }
}

export const setAuthToken = (data) => {
  return {
    type: SET_AUTH_TOKEN,
    data: data
  }
}

export const removeAuthToken = (data) => {
  return {
    type: REMOVE_AUTH_TOKEN,
    data: data
  }
}

// Reducer
export const authReducer = (state = new AuthRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_USERS_ME_GET:
    case SUCCESS_USERS_ME_UPDATE:
      return state.setMe(action.response)
    case FAILED_USERS_ME_GET:
    case REMOVE_AUTH_TOKEN:
      return state.removeToken()
    case SET_AUTH_TOKEN:
      return state.setToken(action.data)
    default:
      return state
  }
}
