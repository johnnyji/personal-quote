import {
  AUTH_FACEBOOK,
  AUTH_MEDIUM,
  AUTH_REDDIT
} from '../action_types/AuthActionTypes';
import AuthActionCreators from '../action_creators/AuthActionCreators';
import config from '../../../../config';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';
import parseQuery from '../utils/http/parseQuery';

const authenticateThroughReddit = () => {
  return (dispatch) => {
    // Set the auth state to pending so the extension page can show a
    // loading icon
    dispatch(AuthActionCreators.authRedditPending());
    
    // The URL to initiate the Reddit OAuth process
    const oauthUrl = endpoints.auth.reddit.oauthStepOne;

    // Launches OAuth auth flow for Reddit
    chrome.identity.launchWebAuthFlow({url: oauthUrl, interactive: true}, (responseUrl) => {
      const {error, code, state} = parseQuery(responseUrl);

      // The response was not correct
      if (state !== config.reddit.confirmString || error) {
        dispatch(AuthActionCreators.authRedditError('We couldn\'t properly authenticate your Reddit account.'));
        return;
      }

      const encodedAuthorization = btoa(`${config.reddit.clientId}:`);

      fetch(endpoints.auth.reddit.oauthStepTwo, {
        credentials: 'include',
        headers: {
          'Authorization': encodedAuthorization
        },
        method: 'post',
        mode: 'no-cors',
        body: 'grant_type=authorization_code' +
          `&code=${code}` +
          `&redirect_uri=${chrome.identity.getRedirectURL(config.reddit.redirectPath)}`
      })
        .then((response) => response.text())
        .then((response) => {
          debugger;
        })
        .catch((err) => {
          debugger;
        });

    });
  };
};

// TODO: Refactor to use Rx Observables
const authenticateThroughFacebook = () => {
  return (dispatch) => {
    // Set the auth state to pending so the extension page can show a
    // loading icon
    dispatch(AuthActionCreators.authFacebookPending());
    
    const url = endpoints.auth.facebook.oauthStepOne;
    // Launches OAuth2.0 auth flow for Facebook
    chrome.identity.launchWebAuthFlow({url, interactive: true}, (responseUrl) => {
      const query = parseQuery(responseUrl);

      // If theres an error with the oauth authentication, we need to display it
      // to the user
      if (Object.prototype.hasOwnProperty.call(query, 'error_description')) {
        dispatch(AuthActionCreators.authMediumError(query.error_description));
        return;
      }

      // Endpoint to get the accessToken to finish our oauth process
      const oauthAccessTokenEndpoint = `${config.facebook.apiPath}/oauth/access_token` +
        `?client_id=${config.facebook.clientId}` +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.facebook.redirectPath)}` +
        `&client_secret=${config.facebook.clientSecret}` +
        `&code=${query.code}`;

      // An app access token needed to make the call to inspect our oauth accessToken
      const appAccessTokenEndpoint = `${config.facebook.apiPath}/oauth/access_token` +
        `?client_id=${config.facebook.clientId}` +
        `&client_secret=${config.facebook.clientSecret}` +
        `&grant_type=client_credentials`;

      // TODO: Jesus this is so ugly, refactor using Rx.js
      Promise.all([
        http.get(oauthAccessTokenEndpoint),
        http.get(appAccessTokenEndpoint)
      ])
        .then((response) => {
          const [{accessToken: oauthAccessToken}, {accessToken: appAccessToken}] = response;
          const inspectTokenEndpoint = 'https://graph.facebook.com/debug_token' +
            `?input_token=${oauthAccessToken}` +
            `&access_token=${appAccessToken}`;
          // We need to hit this endpoint in order to get the users id
          http.get(inspectTokenEndpoint)
            .then(({data}) => {
              if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                dispatch(AuthActionCreators.authFacebookError(data.error.message));
              }
              
              // Once we've finally gone through the entire auth process and gotten the user id,
              // the last step is to get the user and send that data to our reducer
              http.get(`${config.facebook.apiPath}/${data.userId}`, {
                'Authorization': `Bearer ${oauthAccessToken}`
              })
                .then((user) => {
                  dispatch(AuthActionCreators.authFacebookSuccess(oauthAccessToken, user));
                })
                .catch((err) => {
                  debugger;
                });
            })
            .catch((err) => {
              debugger;
            });
        })
        .catch((err) => {
          debugger;
        });
      
    });
  };
};

/**
 * Authenticates OAuth with www.medium.com
 * TODO: Currently not working
 */
const authenticateThroughMedium = () => {
  return (dispatch) => {
    // Set the auth state to pending so the extension page can show a
    // loading icon
    dispatch(AuthActionCreators.authMediumPending());

    const url = endpoints.auth.medium.oauthStepOne;

    // Launches OAuth2.0 auth flow for www.medium.com
    chrome.identity.launchWebAuthFlow({url, interactive: true}, (responseUrl) => {
      const {error, code, state} = parseQuery(responseUrl);

      // Error with OAuth
      if (error) {
        dispatch(AuthActionCreators.authMediumError(error));
        return;
      }

      // Request was tampered with
      if (state !== config.medium.confirmString) {
        dispatch(AuthActionCreators.authMediumError('Unable to authenticate. Please try again.'));
        return;
      }

      const body = `code=${code}&client_id=${config.medium.clientId}` +
        `&client_secret=${config.medium.clientSecret}&grant_type=authorization_code` +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.medium.redirectPath)}`;

      fetch(endpoints.auth.medium.oauthStepTwo, {
        credentials: 'include',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Host': 'api.medium.com:443'
        },
        // mode: 'no-cors',
        body
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
  [AUTH_FACEBOOK]: authenticateThroughFacebook,
  [AUTH_MEDIUM]: authenticateThroughMedium,
  [AUTH_REDDIT]: authenticateThroughReddit
};
