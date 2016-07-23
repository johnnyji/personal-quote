import 'babel-polyfill';
import './scss/index.scss';
import App from './src/components/App.js';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import React from 'react';
import {Store} from 'react-chrome-redux';
import reduxStore from '../background/src/store';

// Hydrates the proxy store with the state from our Redux Store
const proxyStore = new Store({
  state: reduxStore.getState(),
  portName: 'whatisaportname?'
});

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>
, document.getElementById('app'));
