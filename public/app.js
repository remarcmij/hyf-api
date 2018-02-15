{
  const BASE_URL = 'http://localhost:3000';
  const PRIZES_ENDPOINT = BASE_URL + '/prizes';
  const LAUREATES_ENDPOINT = BASE_URL + '/laureates';

  class View {

    constructor() {
      this.root = document.getElementById('root');
    }

    render() {
      this.renderHeader();
      this.renderListContainer();
    }

    renderHeader() {
      createAndAppend('h1', this.root, 'Nobel Prize Winners');
      const div = createAndAppend('div', this.root);
      const input = createAndAppend('input', div);
      input.setAttribute('type', 'text');
      const prizesButton = createAndAppend('button', div, 'PRIZES');
      prizesButton.addEventListener('click', () => this.onPrizesClick(input.value));
      const laureatesButton = createAndAppend('button', div, 'LAUREATES');
      laureatesButton.addEventListener('click', () => this.onLaureatesClick(input.value));
    }

    renderListContainer() {
      const ul = document.createElement('ul');
      this.root.appendChild(ul);
      this.listContainer = ul;
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
      this.addRow(tbody, 'Name', `${firstname} ${surname}`);
      this.addRow(tbody, 'Born', laureate.born + '<br>' + laureate.bornCountry);
      if (laureate.died !== '0000-00-00') {
        this.addRow(tbody, 'Died', laureate.died + '<br>' + laureate.diedCountry);
      }
      const prizeInfo = laureate.prizes.reduce((prev, prize) => {
        if (prev) {
          prev += '<br>';
        }
        return prev + `${prize.year}, ${prize.category}: ${prize.motivation}`;
      }, '');
      this.addRow(tbody, 'Prize(s)', prizeInfo);
    }

    addRow(tbody, label, value) {
      const row = createAndAppend('tr', tbody);
      createAndAppend('td', row, label + ':', 'label');
      createAndAppend('td', row, value);
    }

    onPrizesClick(value) {
      fetchJSON(PRIZES_ENDPOINT + value, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          this.renderPrizes(data);
        }
      });
    }

    onLaureatesClick(value) {
      fetchJSON(LAUREATES_ENDPOINT + value, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          this.renderLaureates(data);
        }
      });
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

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => cb(null, xhr.response);
    xhr.onerror = () => cb(new Error(xhr.statusText));
  }

  function start() {
    const view = new View();
    view.render();
  }

  window.onload = start;
}
