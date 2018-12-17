import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    tweet: require('../features/tweet/TweetRedux').reducer,
    // redux-offline-queue reducer
    offlineRedux: require('redux-offline-queue').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
