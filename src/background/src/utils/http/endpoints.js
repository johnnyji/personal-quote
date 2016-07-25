import config from '../../../../../config';

export default {
  auth: {
    medium: {
      oauthStepOne: 'https://medium.com/m/oauth/authorize' +
        `?client_id=${config.medium.clientId}` +
        `&scope=basicProfile,listPublications` +
        `&state=${config.medium.confirmString}` +
        `&response_type=code` +
        `&redirect_uri=${chrome.identity.getRedirectURL(config.medium.redirectPath)}`,
      oauthStepTwo: `${config.medium.apiPath}/tokens`
    }
  },
  photos: 'https://pixabay.com/api/?key=2973776-27d95f979eadaac9e23600307&q=rain&image_type=photo&pretty=true'
};
