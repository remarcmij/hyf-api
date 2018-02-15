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
      this.renderListContent();
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

    renderListContent(data) {
      console.log(data);
    }

    onPrizesClick(value) {
      fetchJSON(PRIZES_ENDPOINT + value, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          this.renderListContent(data);
        }
      });
    }

    onLaureatesClick(value) {
      fetchJSON(LAUREATES_ENDPOINT + value, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          this.renderListContent(data);
        }
      });
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
