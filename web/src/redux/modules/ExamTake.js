import ExamTakeRecord from "../records/ExamTake";

import {api as API} from "Config";
import {CALL_API} from "../middlewares/ApiClient";

// Action types
export const REQUEST_EXAM_TAKE_USER_GET_BY_USER = 'REQUEST_EXAM_TAKE_USER_GET_BY_USER'
export const SUCCESS_EXAM_TAKE_USER_GET_BY_USER = 'SUCCESS_EXAM_TAKE_USER_GET_BY_USER'
export const FAILED_EXAM_TAKE_USER_GET_BY_USER = 'FAILED_EXAM_TAKE_USER_GET_BY_USER'

export const REQUEST_EXAM_TAKE_USER_CREATE = 'REQUEST_EXAM_TAKE_USER_CREATE'
export const SUCCESS_EXAM_TAKE_USER_CREATE = 'SUCCESS_EXAM_TAKE_USER_CREATE'
export const FAILED_EXAM_TAKE_USER_CREATE = 'FAILED_EXAM_TAKE_USER_CREATE'

export const SET_EXAM_TAKE_ID = 'SET_EXAM_TAKE_ID'
export const SET_EXAM_TAKE_MODAL_MESSAGE = 'SET_EXAM_TAKE_MODAL_MESSAGE'
export const SHOW_EXAM_TAKE_COMPLETE_MODAL = 'SHOW_EXAM_TAKE_COMPLETE_MODAL'
export const CLEAR_EXAM_TAKE_COMPLETE_MODAL = 'CLEAR_EXAM_TAKE_COMPLETE_MODAL'
export const START_EXAM_TIMER = 'START_EXAM_TIMER'
export const STOP_EXAM_TIMER = 'STOP_EXAM_TIMER'
export const UPDATE_EXAM_TAKE_SECONDS = 'UPDATE_EXAM_TAKE_SECONDS'
export const SET_FINISH = 'SET_FINISH'

// Action
export const setExam = (data) => {
  return {
    type: SET_EXAM_TAKE_ID,
    data: data
  }
}

export const setFinish = (data) => {
  return {
    type: SET_FINISH,
    data: data
  }
}

export const setModalMessage = (data) => {
  return {
    type: SET_EXAM_TAKE_MODAL_MESSAGE,
    data: data
  }
}

export const showModal = (data) => {
  return {
    type: SHOW_EXAM_TAKE_COMPLETE_MODAL,
    data: data
  }
}

export const clearModal = (data) => {
  return {
    type: CLEAR_EXAM_TAKE_COMPLETE_MODAL,
    data: data
  }
}

export const startTimer = (data) => {
  return {
    type: START_EXAM_TIMER,
    data: data
  }
}

export const stopTimer = (data) => {
  return {
    type: STOP_EXAM_TIMER,
    data: data
  }
}


export const updateTakeSeconds = (data) => {
  return {
    type: UPDATE_EXAM_TAKE_SECONDS,
    data: data
  }
}

export const getExamTakeUsersByUser = (token) => {
  return {
    [CALL_API]: {
      api: API.methods.getExamTakeUsersByUser,
      requestTypes: [REQUEST_EXAM_TAKE_USER_GET_BY_USER],
      successTypes: [SUCCESS_EXAM_TAKE_USER_GET_BY_USER],
      failedTypes: [FAILED_EXAM_TAKE_USER_GET_BY_USER],
      token: token
    }
  }
}

export const createExamTakeUser = (data, token) => {
  return {
    [CALL_API]: {
      api: API.methods.createExamTakeUser,
      requestTypes: [REQUEST_EXAM_TAKE_USER_CREATE],
      successTypes: [SUCCESS_EXAM_TAKE_USER_CREATE],
      failedTypes: [FAILED_EXAM_TAKE_USER_CREATE],
      body: data,
      token: token
    }
  }
}

// Reducer
export const examTakeReducer = (state = new ExamTakeRecord(), action) => {
  const {type} = action
  switch (type) {
    case SET_EXAM_TAKE_ID:
      return state.setExam(action.data)
    case SET_FINISH:
      return state.setFinish(action.data)
    case SET_EXAM_TAKE_MODAL_MESSAGE:
      return state.setModalMessage(action.data)
    case SHOW_EXAM_TAKE_COMPLETE_MODAL:
      return state.showModal(action.data)
    case CLEAR_EXAM_TAKE_COMPLETE_MODAL:
      return state.clearModal(action.data)
    case START_EXAM_TIMER:
      return state.startTimer(action.data)
    case STOP_EXAM_TIMER:
      return state.stopTimer(action.data)
    case UPDATE_EXAM_TAKE_SECONDS:
      return state.updateTakeSeconds()
    case SUCCESS_EXAM_TAKE_USER_GET_BY_USER:
      return state.setExamTakeUsers(action.response)
    default:
      return state
  }
}
