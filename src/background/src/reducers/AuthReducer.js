import {
  AUTH_FACEBOOK_PENDING,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_MEDIUM_PENDING
} from '../action_types/AuthActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  accessTokens: {
    facebook: null
  },
  currentUser: null,
  fetched: false,
  fetching: false
};

export default createReducer(initialState, {

  name: 'Auth',

  handlers: {
    onAuthPending: [
      AUTH_FACEBOOK_PENDING,
      AUTH_MEDIUM_PENDING
    ],
    onAuthFacebook: [
      AUTH_FACEBOOK_SUCCESS
    ]
  },

  onAuthPending(state) {
    return {...state, fetched: false, fetching: true};
  },

  onAuthFacebook(state, {accessToken, user}) {
    return {
      ...state,
      accessTokens: {...state.accessTokens, facebook: accessToken},
      currentUser: user,
      fetched: true,
      fetching: false
    };
  }

});
