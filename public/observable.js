'use strict';

// eslint-disable-next-line no-var
var App = App || {};
{
  class Observable {
    constructor() {
      this.subscribers = new Set();
    }

    subscribe(subscriber) {
      this.subscribers.add(subscriber);
      return () => this.subscribers.delete(subscriber);
    }

    notify(data) {
      this.subscribers.forEach(subscriber => {
        subscriber.update(data);
      });
    }
  }

  App.Observable = Observable;
}
