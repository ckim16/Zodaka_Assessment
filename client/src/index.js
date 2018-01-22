import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // makes the redux store available to the connect() calls in the component hierarchy below
import { applyMiddleware, createStore } from 'redux'; //components for building store
import Thunk from 'redux-thunk'; // middleware

import App from './components/app';
import Reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
const store = createStoreWithMiddleware(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.querySelector('.container'));