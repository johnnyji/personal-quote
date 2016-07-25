import {
  AUTH_MEDIUM
} from '../action_types/AuthActionTypes';
import AuthActionCreators from '../action_creators/AuthActionCreators';
import config from '../../../../config';
import endpoints from '../utils/http/endpoints';
import parseQuery from '../utils/http/parseQuery';

const authenticateThroughMedium = () => {
  return (dispatch) => {
    // Set the auth state to pending so the extension page can show a
    // loading icon
    dispatch(AuthActionCreators.authMediumPending());

    const url = endpoints.auth.medium.oauthStepOne;

    // Launches OAuth2.0 auth flow for www.medium.com
    chrome.identity.launchWebAuthFlow({url, interactive: true}, (responseUrl) => {
      const query = parseQuery(responseUrl);

      // If theres an error with the oauth authentication, we need to display it
      // to the user
      if (Object.prototype.hasOwnProperty.call(query, 'error')) {
        dispatch(AuthActionCreators.authMediumError(query.error));
        return;
      }

      const formData = new FormData();
      formData.append('code', query.code);
      formData.append('client_id', config.medium.clientId);
      formData.append('client_secret', config.medium.clientSecret);
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', chrome.identity.getRedirectURL(config.medium.redirectPath));

      fetch(endpoints.auth.medium.oauthStepTwo, {
        method: 'post',
        body: formData
      })
        .then((response) => response.json())
        .then((response) => {
          debugger;
        })
        .catch((err) => {
          debugger;
        });
    });
  };
};

export default {
  [AUTH_MEDIUM]: authenticateThroughMedium
};
