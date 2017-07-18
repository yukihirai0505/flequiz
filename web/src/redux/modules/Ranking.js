import {api as API} from "Config";
import {CALL_API} from "../middlewares/ApiClient";
import RankingRecord from "../records/Ranking";

// Action types
export const REQUEST_RANKING_GET = 'REQUEST_RANKING_GET'
export const SUCCESS_RANKING_GET = 'SUCCESS_RANKING_GET'
export const FAILED_RANKING_GET = 'FAILED_RANKING_GET'

export const SET_HIDDEN_COMMAND = 'SET_HIDDEN_COMMAND'

// Action
export const getRanking = () => {
  return {
    [CALL_API]: {
      api: API.methods.getRanking,
      requestTypes: [REQUEST_RANKING_GET],
      successTypes: [SUCCESS_RANKING_GET],
      failedTypes: [FAILED_RANKING_GET]
    }
  }
}

export const setHiddenCommand = (data) => {
  return {
    type: SET_HIDDEN_COMMAND,
    data: data
  }
}

// Reducer
export const rankingReducer = (state = new RankingRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_RANKING_GET:
      return state.setRanking(action.response)
    case SET_HIDDEN_COMMAND:
      return state.setHiddenCommand(action.data)
    default:
      return state
  }
}
