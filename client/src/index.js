import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';

import App from './components/app';
import Reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
const store = createStoreWithMiddleware(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.querySelector('.container'));