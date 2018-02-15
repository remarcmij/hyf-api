'use strict';

// eslint-disable-next-line no-var
var App = App || {};
{
  class Controller {
    constructor(model) {
      this.model = model;
    }

    execute(action) {
      const { type, query } = action;
      this.model.fetchData(type, query);
    }
  }

  App.Controller = Controller;
}
