import { fork, all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */

import AppStateRootSagas from './AppStateSagas';
import TweetSagas from '../features/tweet/TweetSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(AppStateRootSagas),
    fork(TweetSagas),
  ]);
};
