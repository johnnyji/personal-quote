import 'babel-polyfill';
import './scss/index.scss';
import App from './src/components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {portName} from '../../config';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import React from 'react';
import {Store} from 'react-chrome-redux';

const store = new Store({
  portName
});

const unsubscribe = store.subscribe(() => {
  unsubscribe();
  render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  , document.getElementById('app'));
});
