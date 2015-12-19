const React = require('react');
const ReactDom = require('react-dom');

const Remote = require('./components/remote.js');

ReactDom.render(<Remote />, document.querySelector('#container'));
