import React from 'react';
import Router from './router';
import rootReducer from './reducers';

import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const SeriesApp = () => (
  <Provider store={store}>
      <Router />
  </Provider>
);

export default SeriesApp;
