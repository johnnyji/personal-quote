import 'babel-polyfill';
import './scss/index.scss';
import App from './src/components/App.js';
import {portName} from '../../config';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import React from 'react';
import {Store} from 'react-chrome-redux';

const store = new Store({
  portName
});

const unsubscribe = store.subscribe(() => {
  debugger;
  unsubscribe();
  render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('app'));
});
