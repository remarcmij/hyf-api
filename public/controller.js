'use strict';

// eslint-disable-next-line no-var
var App = App || {};

{
  class Controller {
    constructor(model) {
      this.model = model;
    }

    fetchPrizes(query) {
      this.model.fetchData('prizes', query);
    }

    fetchLaureates(query) {
      this.model.fetchData('laureates', query);
    }
  }

  App.Controller = Controller;
}
