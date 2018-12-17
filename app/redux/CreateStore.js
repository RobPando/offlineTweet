import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  middleware.push(offlineMiddleware({ stateName: 'offlineRedux' }))

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  const suspendSagaMiddleware = suspendSaga(sagaMiddleware)
  middleware.push(suspendSagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  /** The consume middleware should be placed last.
   * We allow the previous middlewares (especially the saga middleware) to react to the action
   * before it is eventually consumed.
   */
  middleware.push(consumeActionMiddleware())
  enhancers.push(applyMiddleware(...middleware))

  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && __DEV__
      ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const store = createStore(rootReducer, composeEnhancers(...enhancers))

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
