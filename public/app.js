{
  const BASE_URL = 'http://localhost:3000';
  const PRIZES_ENDPOINT = BASE_URL + '/prizes';
  const LAUREATES_ENDPOINT = BASE_URL + '/laureates';

  class View {

    constructor() {
      this.root = document.getElementById('root');
    }

    render() {
      // render header
      const h1 = document.createElement('h1');
      this.root.appendChild(h1);
      h1.innerHTML = 'Nobel Prize Winners';

      const div = document.createElement('div');
      this.root.appendChild(div);
      const input = document.createElement('input');
      div.appendChild(input);
      const prizesButton = document.createElement('button');
      div.appendChild(prizesButton);
      prizesButton.innerHTML = 'PRIZES';
      prizesButton.addEventListener('click', () => this.onPrizesClick(input.value));
      const laureatesButton = document.createElement('button');
      div.appendChild(laureatesButton);
      laureatesButton.innerHTML = 'LAUREATES';
      laureatesButton.addEventListener('click', () => this.onLaureatesClick(input.value));

      // render list container
      const ul = document.createElement('ul');
      this.root.appendChild(ul);

      // render list content
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = 'Alas, not me!';
    }

    onPrizesClick(value) {
      console.log(PRIZES_ENDPOINT + value);
    }

    onLaureatesClick(value) {
      console.log(LAUREATES_ENDPOINT + value);
    }

  }

  function start() {
    const view = new View();
    view.render();
  }

  window.onload = start;
}
