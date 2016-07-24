import camelCaseObject from 'camelcase-object';

const buildHeaders = () => {
  return {
    'Accept': 'application/json'
    // 'Content-Type': 'application/json'
  };
};

const http = {

  delete(path, data = {}) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        // credentials: 'include',
        method: 'delete',
        headers: buildHeaders(),
        data: JSON.stringify(data)
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  get(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        // credentials: 'include',
        headers: buildHeaders()
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  post(path, data = {}) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        // This is important to persist session data (userId)
        // credentials: 'include',
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data)
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  toJson(response) {
    return response.json();
  }

};

export default http;
