import HeaderRecord from '../records/Header'

// Action types
export const TOGGLE_DROP_DOWN = 'TOGGLE_DROP_DOWN'

// Action
export const toggleDropDownOpen = (data) => {
  return {
    type: TOGGLE_DROP_DOWN,
    data: data
  }
}

// Reducer
export const headerReducer = (state = new HeaderRecord(), action) => {
  const {type} = action
  switch (type) {
    case TOGGLE_DROP_DOWN:
      return state.setDropDownOpen(action.data)
    default:
      return state
  }
}
