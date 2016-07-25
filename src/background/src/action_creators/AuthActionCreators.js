import {
  AUTH_MEDIUM,
  AUTH_MEDIUM_ERROR,
  AUTH_MEDIUM_PENDING,
  AUTH_MEDIUM_SUCCESS,
} from '../action_types/AuthActionTypes';

export default {

  authMedium() {
    return {
      type: AUTH_MEDIUM
    };
  },

  authMediumPending() {
    return {
      type: AUTH_MEDIUM_PENDING
    };
  },

  authMediumError(message) {
    return {
      type: AUTH_MEDIUM_ERROR,
      data: {err: message}
    };
  },

  authMediumSuccess(user) {
    return {
      type: AUTH_MEDIUM_SUCCESS,
      data: {user}
    };
  }

};
