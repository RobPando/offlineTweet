import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import twitter from 'react-native-twitter';

import TweetsActions, { TweetsTypes } from './TweetRedux';
import tokens from '../../config/tokens';

const postStatus = (status) => () => {
  const { rest } = twitter(tokens);

  return rest.post('statuses/update', { status });
}

export function* postTweet(action) {
  const { tweet } = action;
  const response = yield call(postStatus(tweet));

  if (response.created_at) {
    yield put(TweetsActions.successfullyPosted());
  }
}

export default function* root() {
  yield all([
    takeLatest(TweetsTypes.POST_TWEET, postTweet),
  ]);
};
