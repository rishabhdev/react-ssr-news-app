import fetch from 'isomorphic-unfetch';

let storage;
try {
  storage = window.localStorage;
} catch(e) {
  storage = null
}

export function httpClient(baseURL) {
  return {
    get: (path, options) => {
      return fetch(baseURL + path, options).then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      });
    },

    post: (path, body, options = {}) => {
      /**
       * temporary code,
       * persist user data to local storage
       */
      if (storage) {
        const key = path;
        storage.setItem(key, body);
      }
      /**
       * Uncomment this to enable storing to api
       */

      // return fetch(baseURL + path, {
      //   ...options,
      //   method: 'POST',
      //   body: JSON.stringify(body),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...options.headers
      //   }
      // }).then(res => {
      //   if (!res.ok) {
      //     throw new Error(res.statusText);
      //   }

      //   return res.json();
      // });
    }
  };
}
