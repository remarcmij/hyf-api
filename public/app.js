'use strict';

// eslint-disable-next-line no-var
var App = App || {};

{
  const { Model, View, Controller } = App;

  function start() {
    const model = new Model();
    const controller = new Controller(model);
    const view = new View(model, controller);
    view.renderPage();
  }

  window.onload = start;

}
