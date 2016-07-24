import configureStore from './src/store/configureStore';
import {portName} from '../../config';
import {wrapStore} from 'react-chrome-redux';

wrapStore(configureStore(), {
  portName
});
