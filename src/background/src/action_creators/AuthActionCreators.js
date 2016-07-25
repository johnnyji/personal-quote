import {
  AUTH_MEDIUM,
  AUTH_MEDIUM_ERROR,
  AUTH_MEDIUM_PENDING,
  AUTH_MEDIUM_SUCCESS,
  AUTH_FACEBOOK,
  AUTH_FACEBOOK_ERROR,
  AUTH_FACEBOOK_PENDING,
  AUTH_FACEBOOK_SUCCESS
} from '../action_types/AuthActionTypes';

export default {

  authFacebook() {
    return {
      type: AUTH_FACEBOOK
    };
  },

  authFacebookPending() {
    return {
      type: AUTH_FACEBOOK_PENDING
    };
  },

  authFacebookError(message) {
    return {
      type: AUTH_FACEBOOK_ERROR,
      data: {err: message}
    };
  },

  authFacebookSuccess(accessToken, user) {
    return {
      type: AUTH_FACEBOOK_SUCCESS,
      data: {accessToken, user}
    };
  },

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
