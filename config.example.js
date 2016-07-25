module.exports = {
  extensionId: '...',
  portName: 'personal-quote',
  oauth: {
    medium: {
      apiPath: 'https://api.medium.com/v1/',
      clientId: '...',
      clientSecret: '...',
      // This is a confirmation string that the medium api to respond
      // back to our app with to confirm that the request wasn't tampered with
      confirmString: '...',
      redirectPath: '/auth/callback/medium'
    }
  }
};
