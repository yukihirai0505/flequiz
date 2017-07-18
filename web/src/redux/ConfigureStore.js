import {createStore, applyMiddleware, compose} from 'redux'
import client from '../redux/middlewares/ApiClient'
import {createLogger} from 'redux-logger'
import rootReducer from './RootReducer'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  let composes = compose(applyMiddleware(thunk, client, createLogger()))

  const store = createStore(
    rootReducer,
    initialState,
    composes
  )

  return store
}