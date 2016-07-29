import camelCaseObject from 'camelcase-object';

const buildHeaders = (headers) => {
  return Object.assign({}, {
    'Accept': 'application/json'
  }, headers);
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
};
 
export const parseJson = (response) => response.json();

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

  get(path, headers = {}) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        // credentials: 'include',
        headers: buildHeaders(headers)
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
