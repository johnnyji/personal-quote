import {
  CHANGE_WORD_CYCLE_ELAPSE,
  CHANGE_WORD_CYCLE_ELAPSE_SUCCESS,
  FETCH_WORDS,
  FETCH_WORDS_PENDING,
  FETCH_WORDS_SUCCESS,
  SET_NEW_WORD,
  SET_NEW_WORD_PENDING,
  SET_NEW_WORD_SUCCESS
} from '../action_types/WordsActionTypes';

export default {

  changeWordCycleElapse(elapse) {
    return {
      type: CHANGE_WORD_CYCLE_ELAPSE,
      // `react-chrome-redux` requires the data sent to action aliases to be
      // called `payload`
      payload: {elapse}
    };
  },

  changeWordCycleElapseSuccess(elapse) {
    return {
      type: CHANGE_WORD_CYCLE_ELAPSE_SUCCESS,
      data: {elapse}
    };
  },

  fetch() {
    return {
      type: FETCH_WORDS
    };
  },

  fetching() {
    return {
      type: FETCH_WORDS_PENDING
    };
  },

  fetchSuccess(word) {
    return {
      type: FETCH_WORDS_SUCCESS,
      data: {word}
    };
  },

  setNewWord(words) {
    return {
      type: SET_NEW_WORD,
      // This must be named payload for `react-chrome-redux` because
      // this action will be intercepted by an alias
      payload: {words}
    };
  },

  setNewWordPending() {
    return {
      type: SET_NEW_WORD_PENDING
    };
  },

  setNewWordSuccess(word) {
    return {
      type: SET_NEW_WORD_SUCCESS,
      data: {word}
    };
  }

};
