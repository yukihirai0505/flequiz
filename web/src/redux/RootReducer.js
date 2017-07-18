import {combineReducers} from "redux"
import {reducer as formReducer} from 'redux-form'
import {examCategoryReducer} from './modules/ExamCategory'
import {examReducer} from './modules/Exam'
import {examTakeReducer} from './modules/ExamTake'
import {authReducer} from './modules/Auth'
import {rankingReducer} from './modules/Ranking'
import {userReducer} from './modules/User'

import {headerReducer} from './modules/Header'

export default combineReducers({
  form: formReducer,
  examCategory: examCategoryReducer,
  exam: examReducer,
  examTake: examTakeReducer,
  header: headerReducer,
  auth: authReducer,
  ranking: rankingReducer,
  user: userReducer,
})
