'use strict';

// eslint-disable-next-line no-var
var App = App || {};

{
  class View {

    constructor(model, controller) {
      model.subscribe(this);
      this.controller = controller;
      this.root = document.getElementById('root');
    }

    renderPage() {
      this.renderHeader();
      this.listContainer = this.renderListContainer();
    }

    renderHeader() {
      createAndAppend('h1', this.root, 'Nobel Prize Winners');
      const div = createAndAppend('div', this.root);
      const input = createAndAppend('input', div);
      const prizesButton = createAndAppend('button', div, 'PRIZES');
      prizesButton.addEventListener('click', () => this.onPrizesClick(input.value));
      const laureatesButton = createAndAppend('button', div, 'LAUREATES');
      laureatesButton.addEventListener('click', () => this.onLaureatesClick(input.value));
    }

    renderListContainer() {
      return createAndAppend('div', this.root);
    }

    renderPrizes(prizes) {

      const renderWinner = (ul, winner) => {
        const { surname, firstname, motivation } = winner;
        createAndAppend('li', ul, `${surname}, ${firstname}: ${motivation}`);
      };

      const renderPrize = prize => {
        const div = createAndAppend('div', this.listContainer);
        const ul = createAndAppend('ul', div);
        createAndAppend('li', ul, 'Year: ' + prize.year);
        createAndAppend('li', ul, 'Category: ' + prize.category);
        prize.laureates.forEach(winner => renderWinner(ul, winner));
      };

      prizes.forEach(prize => renderPrize(prize));
    }

    renderLaureates(laureates) {
      laureates.forEach(laureate => {
        const { surname, firstname } = laureate;
        createAndAppend('li', this.listContainer, `Name: ${surname}, ${firstname}`);
      });
    }

    onPrizesClick(value) {
      this.controller.execute({ type: 'prizes', query: value });
    }

    onLaureatesClick(value) {
      this.controller.execute({ type: 'laureates', query: value });
    }

    update(typeAndData) {
      const { type, data } = typeAndData;
      this.listContainer.innerHTML = '';
      if (type === 'prizes') {
        this.renderPrizes(data);
      } else {
        this.renderLaureates(data);
      }
    }
  }

  function createAndAppend(name, parent, innerHTML) {
    const child = document.createElement(name);
    parent.appendChild(child);
    if (innerHTML !== undefined) {
      child.innerHTML = innerHTML;
    }
    return child;
  }

  App.View = View;
}
