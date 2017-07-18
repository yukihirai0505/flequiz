import {api as API} from 'Config'
import {CALL_API} from '../middlewares/ApiClient'
import ExamCategoryRecord from '../records/ExamCategory'

// Action types
export const REQUEST_EXAM_CATEGORY_GET = 'REQUEST_EXAM_CATEGORY_GET'
export const SUCCESS_EXAM_CATEGORY_GET = 'SUCCESS_EXAM_CATEGORY_GET'
export const FAILED_EXAM_CATEGORY_GET = 'FAILED_EXAM_CATEGORY_GET'

export const REQUEST_EXAM_CATEGORY_CREATE = 'REQUEST_EXAM_CATEGORY_CREATE'
export const SUCCESS_EXAM_CATEGORY_CREATE = 'SUCCESS_EXAM_CATEGORY_CREATE'
export const FAILED_EXAM_CATEGORY_CREATE = 'FAILED_EXAM_CATEGORY_CREATE'

export const REQUEST_EXAM_CATEGORY_EDIT = 'REQUEST_EXAM_CATEGORY_EDIT'
export const SUCCESS_EXAM_CATEGORY_EDIT = 'SUCCESS_EXAM_CATEGORY_EDIT'
export const FAILED_EXAM_CATEGORY_EDIT = 'FAILED_EXAM_CATEGORY_EDIT'

export const SHOW_EXAM_CATEGORY_COMPLETE_MODAL = 'SHOW_EXAM_CATEGORY_COMPLETE_MODAL'
export const SET_EDIT_EXAM_CATEGORY = 'SET_EDIT_EXAM_CATEGORY'

// Action
export const getExamCategories = () => {
  return {
    [CALL_API]: {
      api: API.methods.getExamCategories,
      requestTypes: [REQUEST_EXAM_CATEGORY_GET],
      successTypes: [SUCCESS_EXAM_CATEGORY_GET],
      failedTypes: [FAILED_EXAM_CATEGORY_GET]
    }
  }
}

export const createExamCategory = (data) => {
  return {
    [CALL_API]: {
      api: API.methods.createExamCategory,
      requestTypes: [REQUEST_EXAM_CATEGORY_CREATE],
      successTypes: [SUCCESS_EXAM_CATEGORY_CREATE],
      failedTypes: [FAILED_EXAM_CATEGORY_CREATE],
      body: data
    }
  }
}

export const editExamCategory = (data, id) => {
  return {
    [CALL_API]: {
      api: API.methods.editExamCategory,
      requestTypes: [REQUEST_EXAM_CATEGORY_EDIT],
      successTypes: [SUCCESS_EXAM_CATEGORY_EDIT],
      failedTypes: [FAILED_EXAM_CATEGORY_EDIT],
      body: data,
      params: id
    }
  }
}

export const showModal = (data) => {
  return {
    type: SHOW_EXAM_CATEGORY_COMPLETE_MODAL,
    data: data
  }
}

export const setEditExamCategory = (data) => {
  return {
    type: SET_EDIT_EXAM_CATEGORY,
    data: data
  }
}


// Reducer
export const examCategoryReducer = (state = new ExamCategoryRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_EXAM_CATEGORY_GET:
      return state.setCategories(action.response)
    case SHOW_EXAM_CATEGORY_COMPLETE_MODAL:
      return state.showModal(action.data)
    case SET_EDIT_EXAM_CATEGORY:
      return state.setEditExamCategory(action.data)
    case SUCCESS_EXAM_CATEGORY_CREATE:
    case SUCCESS_EXAM_CATEGORY_EDIT:
      return state.showModal(true)
    default:
      return state
  }
}
