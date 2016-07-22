import 'babel-polyfill';
import App from './src/components/App.js';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import React from 'react';
import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  state: {},
  portName: 'whatisaportname?'
});

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>
, document.getElementById('app'));
