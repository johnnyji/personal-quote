import {
  FETCH_WORDS,
  FETCH_WORDS_PENDING,
  FETCH_WORDS_SUCCESS,
  SET_NEW_WORD,
  SET_NEW_WORD_PENDING,
  SET_NEW_WORD_SUCCESS
} from '../action_types/WordsActionTypes';

export default {

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

  setWordPending() {
    return {
      type: SET_NEW_WORD_PENDING
    };
  },

  setWordSuccess(word) {
    return {
      type: SET_NEW_WORD_SUCCESS,
      data: {word}
    };
  }

};
