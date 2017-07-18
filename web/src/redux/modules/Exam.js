import {api as API} from "Config";
import {CALL_API} from "../middlewares/ApiClient";
import ExamRecord from "../records/Exam";

// Action types
export const REQUEST_EXAM_GET = 'REQUEST_EXAM_GET'
export const SUCCESS_EXAM_GET = 'SUCCESS_EXAM_GET'
export const FAILED_EXAM_GET = 'FAILED_EXAM_GET'

export const REQUEST_EXAM_BY_ID_GET = 'REQUEST_EXAM_BY_ID_GET'
export const SUCCESS_EXAM_BY_ID_GET = 'SUCCESS_EXAM_BY_ID_GET'
export const FAILED_EXAM_BY_ID_GET = 'FAILED_EXAM_BY_ID_GET'

export const REQUEST_EXAM_CREATE = 'REQUEST_EXAM_CREATE'
export const SUCCESS_EXAM_CREATE = 'SUCCESS_EXAM_CREATE'
export const FAILED_EXAM_CREATE = 'FAILED_EXAM_CREATE'

export const REQUEST_EXAM_EDIT = 'REQUEST_EXAM_EDIT'
export const SUCCESS_EXAM_EDIT = 'SUCCESS_EXAM_EDIT'
export const FAILED_EXAM_EDIT = 'FAILED_EXAM_EDIT'

export const CLEAN_SELECTED_EXAM = 'CLEAN_SELECTED_EXAM'

export const SET_EXAM_QUESTIONS = 'SET_EXAM_QUESTIONS'

export const SHOW_EXAM_COMPLETE_MODAL = 'SHOW_EXAM_COMPLETE_MODAL'

export const SET_EXAM_EDIT_STARTED = 'SET_EXAM_EDIT_STARTED'

// Action
export const getExams = () => {
  return {
    [CALL_API]: {
      api: API.methods.getExams,
      requestTypes: [REQUEST_EXAM_GET],
      successTypes: [SUCCESS_EXAM_GET],
      failedTypes: [FAILED_EXAM_GET]
    }
  }
}

export const getExamById = (data) => {
  return {
    [CALL_API]: {
      api: API.methods.getExamById,
      requestTypes: [REQUEST_EXAM_BY_ID_GET],
      successTypes: [SUCCESS_EXAM_BY_ID_GET],
      failedTypes: [FAILED_EXAM_BY_ID_GET],
      params: data
    }
  }
}

export const createExam = (data) => {
  return {
    [CALL_API]: {
      api: API.methods.createExam,
      requestTypes: [REQUEST_EXAM_CREATE],
      successTypes: [SUCCESS_EXAM_CREATE],
      failedTypes: [FAILED_EXAM_CREATE],
      body: data
    }
  }
}

export const editExam = (data, id) => {
  return {
    [CALL_API]: {
      api: API.methods.editExam,
      requestTypes: [REQUEST_EXAM_EDIT],
      successTypes: [SUCCESS_EXAM_EDIT],
      failedTypes: [FAILED_EXAM_EDIT],
      body: data,
      params: id
    }
  }
}

export const setQuestions = (data) => {
  return {
    type: SET_EXAM_QUESTIONS,
    data: data
  }
}

export const cleanSelectedExam = (data) => {
  return {
    type: CLEAN_SELECTED_EXAM,
    data: data
  }
}

export const showModal = (data) => {
  return {
    type: SHOW_EXAM_COMPLETE_MODAL,
    data: data
  }
}

export const setEditStarted = (data) => {
  return {
    type: SET_EXAM_EDIT_STARTED,
    data: data
  }
}



// Reducer
export const examReducer = (state = new ExamRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_EXAM_GET:
      return state.setExams(action.response)
    case SUCCESS_EXAM_BY_ID_GET:
      return state.setExam(action.response)
    case SET_EXAM_QUESTIONS:
      return state.setQuestions(action.data)
    case CLEAN_SELECTED_EXAM:
      return state.setExam({})
    case SUCCESS_EXAM_CREATE:
    case SUCCESS_EXAM_EDIT:
      return state.showModal(true)
    case SHOW_EXAM_COMPLETE_MODAL:
      return state.showModal(action.data)
    case SET_EXAM_EDIT_STARTED:
      return state.setEditStarted(action.data)
    default:
      return state
  }
}
