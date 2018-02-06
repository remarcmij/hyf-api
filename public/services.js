'use strict';

// eslint-disable-next-line no-var
var App = App || {};

{
  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => resolve(xhr.responseText));
      xhr.addEventListener('error', () => reject(xhr.statusText));
      xhr.open('GET', url);
      xhr.send();
    }).then(res => JSON.parse(res));
  }

  App.services = {
    fetchJSON
  };
}
