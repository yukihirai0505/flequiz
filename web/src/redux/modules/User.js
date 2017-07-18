import {api as API} from "Config";
import {CALL_API} from "../middlewares/ApiClient";
import UserRecord from "../records/User";

// Action types
export const REQUEST_USER_GET = 'REQUEST_USER_GET'
export const SUCCESS_USER_GET = 'SUCCESS_USER_GET'
export const FAILED_USER_GET = 'FAILED_USER_GET'

export const REQUEST_USER_BY_ID_GET = 'REQUEST_USER_BY_ID_GET'
export const SUCCESS_USER_BY_ID_GET = 'SUCCESS_USER_BY_ID_GET'
export const FAILED_USER_BY_ID_GET = 'FAILED_USER_BY_ID_GET'


export const REQUEST_USER_BY_ID_DELETE = 'REQUEST_USER_BY_ID_DELETE'
export const SUCCESS_USER_BY_ID_DELETE = 'SUCCESS_USER_BY_ID_DELETE'
export const FAILED_USER_BY_ID_DELETE = 'FAILED_USER_BY_ID_DELETE'

export const SET_USER_DELETE_MODAL = 'SET_USER_DELETE_MODAL'
export const SET_USER_MODAL_MESSAGE = 'SET_USER_MODAL_MESSAGE'
export const SET_USER = 'SET_USER'

// Action
export const getUsers = () => {
  return {
    [CALL_API]: {
      api: API.methods.getUsers,
      requestTypes: [REQUEST_USER_GET],
      successTypes: [SUCCESS_USER_GET],
      failedTypes: [FAILED_USER_GET]
    }
  }
}

export const setUser = (data) => {
  return {
    type: SET_USER,
    data: data
  }
}

export const deleteUserById = (data) => {
  return {
    [CALL_API]: {
      api: API.methods.deleteUser,
      requestTypes: [REQUEST_USER_BY_ID_DELETE],
      successTypes: [SUCCESS_USER_BY_ID_DELETE],
      failedTypes: [FAILED_USER_BY_ID_DELETE],
      params: data
    }
  }
}

export const setShowDeleteModal = (data) => {
  return {
    type: SET_USER_DELETE_MODAL,
    data: data
  }
}

export const setModalMessage = (data) => {
  return {
    type: SET_USER_MODAL_MESSAGE,
    data: data
  }
}

// Reducer
export const userReducer = (state = new UserRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_USER_GET:
      return state.setUsers(action.response)
    case SUCCESS_USER_BY_ID_DELETE:
      return state.setDeleted()
    case SET_USER_DELETE_MODAL:
      return state.setShowDeleteModal(action.data)
    case SET_USER:
      return state.setUser(action.data)
    case SET_USER_MODAL_MESSAGE:
      return state.setModalMessage(action.data)
    default:
      return state
  }
}
