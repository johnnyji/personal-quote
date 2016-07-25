import {
  AUTH_MEDIUM
} from '../action_types/AuthActionTypes';
import AuthActionCreators from '../action_creators/AuthActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const authenticateThroughMedium = () => {
  return (dispatch) => {

    dispatch(AuthActionCreators.authMediumPending());

    // Launches OAuth2.0 auth flow for www.medium.com
    chrome.identity.launchWebAuthFlow();

    http.get(endpoints.auth.medium)
      .then((response) => {
        debugger;
      })
      .catch((response) => {
        debugger;
      });
  };
};

export default {
  [AUTH_MEDIUM]: authenticateThroughMedium
};
