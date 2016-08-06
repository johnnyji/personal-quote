import {
  CHANGE_WORD_CYCLE_ELAPSE_SUCCESS,
  FETCH_WORDS_PENDING,
  FETCH_WORDS_SUCCESS,
  SET_NEW_WORD_PENDING,
  SET_NEW_WORD_SUCCESS
} from '../action_types/WordsActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  fetched: false,
  word: null,
  wordCycleElapse: null
};

export default createReducer(initialState, {

  name: 'Words',

  handlers: {
    onChangeWordCycleElapse: [CHANGE_WORD_CYCLE_ELAPSE_SUCCESS],
    onFetching: [
      FETCH_WORDS_PENDING,
      SET_NEW_WORD_PENDING
    ],
    onFetched: [
      FETCH_WORDS_SUCCESS,
      SET_NEW_WORD_SUCCESS
    ]
  },

  onChangeWordCycleElapse(state, {elapse}) {
    return {...state, wordCycleElapse: elapse};
  },

  onFetching(state) {
    return {...state, fetched: false};
  },

  onFetched(state, {word}) {
    return {...state, fetched: true, word};
  }

});
