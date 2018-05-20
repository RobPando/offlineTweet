import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import createStore from './redux';
import Tweet from './features/tweet/Tweet';

const store = createStore();

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Tweet />
      </Provider>
    );
  }
}

export default App;
