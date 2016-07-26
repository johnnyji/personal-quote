import config from '../../../../../config';

export default {
  auth: {
    facebook: {
      oauthStepOne: 'https://www.facebook.com/dialog/oauth?' +
        `client_id=${config.facebook.clientId}` +
        `&state=${config.facebook.confirmString}` +
        '&scope=public_profile,user_actions.news,email,publish_pages,user_likes' +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.facebook.redirectPath)}`
    },
    medium: {
      oauthStepOne: 'https://medium.com/m/oauth/authorize' +
        `?client_id=${config.medium.clientId}` +
        `&scope=basicProfile,listPublications` +
        `&state=${config.medium.confirmString}` +
        '&response_type=code' +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.medium.redirectPath)}`,
      oauthStepTwo: `${config.medium.apiPath}/tokens`
    },
    reddit: {
      oauthStepOne: 'https://www.reddit.com/api/v1/authorize' +
        `?client_id=${config.reddit.clientId}` +
        '&response_type=code' +
        `&state=${config.reddit.confirmString}` +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.reddit.redirectPath)}` +
        '&duration=permanent' +
        '&scope=identity mysubreddits read',
      oauthStepTwo: 'https://www.reddit.com/api/v1/access_token'
    },
    twitter: {
      oauthStepOne: 'https://api.twitter.com/oauth/request_token'
    }
  },
  photos: 'https://pixabay.com/api/?key=2973776-27d95f979eadaac9e23600307&q=rain&image_type=photo&pretty=true'
};
