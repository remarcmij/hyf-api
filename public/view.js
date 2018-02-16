'use strict';
/* global moment */
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
      const div = createAndAppend('div', this.root, null, 'toolbar');
      const input = createAndAppend('input', div);
      const prizesButton = createAndAppend('button', div, 'PRIZES');
      prizesButton.addEventListener('click', () => this.onPrizesClick(input.value));
      const laureatesButton = createAndAppend('button', div, 'LAUREATES');
      laureatesButton.addEventListener('click', () => this.onLaureatesClick(input.value));
    }

    renderListContainer() {
      return createAndAppend('div', this.root, null, 'list-container');
    }

    renderPrizes(prizes) {
      const renderPrize = prize => {
        const table = createAndAppend('table', this.listContainer, null, 'md-whiteframe-3dp');
        const tbody = createAndAppend('tbody', table);
        this.addRow(tbody, 'Year', prize.year);
        this.addRow(tbody, 'Category', prize.category);
        const laureates = prize.laureates.reduce((prev, laureate) => {
          if (prev) {
            prev += '<br>';
          }
          prev += `${laureate.firstname} ${laureate.surname}`;
          if (laureate.motivation) {
            prev += `: ${laureate.motivation}`;
          }
          return prev;
        }, '');
        this.addRow(tbody, 'Laureates', laureates);
      };

      prizes.forEach(prize => renderPrize(prize));
    }

    renderLaureates(laureates) {
      laureates.forEach(laureate => this.renderLaureate(laureate));
    }

    renderLaureate(laureate) {
      const { surname, firstname } = laureate;
      const table = createAndAppend('table', this.listContainer, null, 'md-whiteframe-3dp');
      const tbody = createAndAppend('tbody', table);
      this.addRow(tbody, 'Name', `${firstname} ${surname || ''}`);
      this.addRow(tbody, 'Born', moment(laureate.born).format('D MMMM YYYY') + '<br>' + laureate.bornCountry);
      if (laureate.died !== '0000-00-00') {
        this.addRow(tbody, 'Died', moment(laureate.died).format('D MMMM YYYY') + '<br>' + laureate.diedCountry);
      }
      const prizeInfo = laureate.prizes.reduce((prev, prize) => {
        if (prev) {
          prev += '<br>';
        }
        prev += `${prize.year}, ${prize.category}`;
        if (prize.motivation) {
          prev += `: ${prize.motivation}`;
        }
        return prev;
      }, '');
      this.addRow(tbody, 'Prize(s)', prizeInfo);
    }

    addRow(tbody, label, value) {
      const row = createAndAppend('tr', tbody);
      createAndAppend('td', row, label + ':', 'label');
      createAndAppend('td', row, value);
    }

    onPrizesClick(value) {
      this.listContainer.innerHTML = '';
      this.controller.execute({ type: 'prizes', query: value });
    }

    onLaureatesClick(value) {
      this.listContainer.innerHTML = '';
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

  function createAndAppend(name, parent, innerHTML, className) {
    const child = document.createElement(name);
    parent.appendChild(child);
    if (innerHTML) {
      child.innerHTML = innerHTML;
    }
    if (className) {
      child.classList.add(className);
    }
    return child;
  }

  App.View = View;
}
