import GlobalError from '../records/GlobalError'

// Action types
export const SHOW_ERROR = 'SHOW_ERROR'
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'
export const CLEAR_ERROR = 'CLEAR_ERROR'

// Action
export function show(errors) {
  return {
    type: SHOW_ERROR,
    errors: errors,
  }
}

export function showMessage(errors) {
  return {
    type: SHOW_ERROR_MESSAGE,
    errors: errors
  }
}

export function clear() {
  return {
    type: CLEAR_ERROR
  }
}

// Reducer
export function globalErrorReducer(state = new GlobalError, action) {
  const {type} = action
  switch (type) {
    case SHOW_ERROR:
      return state.getErrors(action.status)
    case SHOW_ERROR_MESSAGE:
      return state.getErrorMessages(action.errors)
    case CLEAR_ERROR:
      return state.clear()
    default:
      return state
  }
}