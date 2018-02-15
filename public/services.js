'use strict';

// eslint-disable-next-line no-var
var App = App || {};
{
  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  App.services = {
    fetchJSON
  };
}
