import { eventChannel } from 'redux-saga';
import { put, take, fork, all } from 'redux-saga/effects';
import { NetInfo } from 'react-native';

import { OFFLINE, ONLINE } from 'redux-offline-queue';

/**
 * Launches connectivity state watcher.
 *
 * This is inifinite loop that reacts to NetInfo.isConnected change.
 * The connectivity state is saved to redux store.
 */
export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    NetInfo.isConnected.addEventListener('connectionChange', emitter);
    return () => NetInfo.isConnected.removeEventListener('connectionChange', emitter);
  });
  try {
    for (; ;) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
};

export default function* root() {
  yield all([
    fork(startWatchingNetworkConnectivity),
  ]);
};
