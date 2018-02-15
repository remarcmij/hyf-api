'use strict';

// eslint-disable-next-line no-var
var App = App || {};
{
  const BASE_URL = 'http://localhost:3000/';

  class Model extends App.Observable {
    constructor() {
      super();
      this.cache = new Map();
    }

    fetchData(type, query) {
      const url = BASE_URL + type + query;
      const cached = this.cache.get(url);
      if (cached) {
        console.log('cache hit: ' + url);
        this.notify(cached);
        return;
      }

      App.services.fetchJSON(url)
        .then(data => {
          const result = { type, data };
          this.cache.set(url, result);
          this.notify(result);
        });
    }
  }

  App.Model = Model;
}
