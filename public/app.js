{
  class NobelApp {

    constructor() {
      this.root = document.getElementById('root');
    }

    render() {
      this.renderHeader();
      const ul = this.renderListContainer();
      this.renderListContent(ul);
    }

    renderHeader() {
      const h1 = document.createElement('h1');
      this.root.appendChild(h1);
      h1.innerHTML = 'Nobel Prize Winners';

      const div = document.createElement('div');
      this.root.appendChild(div);
      const input = document.createElement('input');
      div.appendChild(input);
      const button = document.createElement('button');
      div.appendChild(button);
      button.innerHTML = 'SUBMIT';
      button.addEventListener('click', () => this.onClick(input.value));
    }

    renderListContainer() {
      const ul = document.createElement('ul');
      this.root.appendChild(ul);
      return ul;
    }

    renderListContent(ul) {
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = 'Alas, not me!';
    }

    onClick(value) {
      console.log(value);
    }
  }

  function start() {
    const app = new NobelApp();
    app.render();
  }

  window.onload = start;
}
