import {combineReducers} from 'redux';
import auth from './AuthReducer';
import backgroundImage from './BackgroundImageReducer';

export default combineReducers({
  auth,
  backgroundImage
});
