import {combineReducers} from 'redux';
import auth from './AuthReducer';
import backgroundImage from './BackgroundImageReducer';
import words from './WordsReducer';

export default combineReducers({
  auth,
  backgroundImage,
  words
});
