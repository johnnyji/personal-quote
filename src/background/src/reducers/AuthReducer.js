import {
  AUTH_MEDIUM_PENDING
} from '../action_types/AuthActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  currentUser: null,
  fetched: false,
  fetching: false
};

export default createReducer(initialState, {

  name: 'Auth',

  handlers: {
    onAuthPending: [AUTH_MEDIUM_PENDING]
  },

  onAuthPending(state) {
    return {...state, fetched: false, fetching: true};
  }

});
