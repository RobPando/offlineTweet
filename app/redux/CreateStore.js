import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];

  middleware.push(offlineMiddleware());

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  const suspendSagaMiddleware = suspendSaga(sagaMiddleware);
  middleware.push(suspendSagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  /** The consume middleware should be placed last.
   * We allow the previous middlewares (especially the saga middleware) to react to the action
   * before it is eventually consumed.
   */
  middleware.push(consumeActionMiddleware());

  /* ------------- Redux Offline Enchancer ------------- */

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};
