import {combineReducers} from 'redux';
import backgroundImage from './BackgroundImageReducer';
import words from './WordsReducer';

export default combineReducers({
  backgroundImage,
  words
});
