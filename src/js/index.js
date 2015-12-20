const React = require('react');
const ReactDom = require('react-dom');

const App = require('./components/app.js');

ReactDom.render(<App />, document.querySelector('#container'));
