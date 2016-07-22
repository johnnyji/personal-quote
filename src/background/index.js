import {createStore} from 'redux';
import rootReducer from './src/reducers';
import {wrapStore} from 'react-chrome-redux';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'whatisaportname?'
});
