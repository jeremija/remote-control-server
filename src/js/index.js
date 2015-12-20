const React = require('react');
const ReactDom = require('react-dom');

const App = require('./components/app.js');
const navStore = require('./store/navStore.js');
const logStore = require('./store/logStore.js');

function render() {
  ReactDom.render(<App />, document.querySelector('#container'));
}

navStore.addListener(render);
logStore.addListener(render);

render();
