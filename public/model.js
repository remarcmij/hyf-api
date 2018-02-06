'use strict';

// eslint-disable-next-line no-var
var App = App || {};

{
  const BASE_URL = 'http://localhost:3000/';

  class Model {
    constructor() {
      this.cache = new Map();
      this.subscribers = new Set();
    }

    subscribe(subscriber) {
      this.subscribers.add(subscriber);
      return () => this.subscribers.delete(subscriber);
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

    notify(data) {
      this.subscribers.forEach(subscriber => {
        subscriber.update(data);
      });
    }

  }

  App.Model = Model;
}
