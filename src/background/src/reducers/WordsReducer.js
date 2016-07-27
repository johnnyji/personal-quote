import {
  FETCH_WORDS_PENDING,
  FETCH_WORDS_SUCCESS,
  SET_NEW_WORD_PENDING,
  SET_NEW_WORD_SUCCESS
} from '../action_types/WordsActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  fetched: false,
  fetching: false,
  word: null
};

export default createReducer(initialState, {

  name: 'Words',

  handlers: {
    onFetching: [
      FETCH_WORDS_PENDING,
      SET_NEW_WORD_PENDING
    ],
    onFetched: [
      FETCH_WORDS_SUCCESS,
      SET_NEW_WORD_SUCCESS
    ]
  },

  onFetching(state) {
    return {...state, fetched: false, fetching: true};
  },

  onFetched(state, {word}) {
    return {...state, fetched: true, fetching: false, word};
  }

});
