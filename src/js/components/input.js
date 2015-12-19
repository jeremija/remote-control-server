const React = require('react');
const socket = require('../socket.js');

function input({altKey, ctrlKey, shiftKey, metaKey}) {
  function onKeyUp(event) {
    let alt = event.altKey || altKey || false;
    let ctrl = event.ctrlKey || ctrlKey || false;
    let shift = event.shiftKey || shiftKey || false;
    let meta = event.metaKey || metaKey || false;
    let code = event.which || event.keyCode || false;
    let string = event.target.value;
    event.target.value = '';
    socket.emit('keypress', {alt, ctrl, shift, meta, code, string});

    return true;
  }

  return (
    <input onKeyUp={onKeyUp}
      placeholder="select here to type"
      type="text"
    />);
}

module.exports = input;
