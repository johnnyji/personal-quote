import store from './src/store';
import {wrapStore} from 'react-chrome-redux';

wrapStore(store, {
  portName: 'whatisaportname?'
});
