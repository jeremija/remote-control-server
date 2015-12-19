const React = require('react');
const socket = require('../socket.js');

function input({altKey, ctrlKey, shiftKey}) {
  function onKeyUp(event) {
    let alt = event.altKey || altKey;
    let ctrl = event.ctrlKey || ctrlKey;
    let shift = event.shiftKey || shiftKey;
    let code = event.which || event.keyCode;
    let string = event.target.value;
    event.target.value = '';
    socket.emit('keypress', {alt, ctrl, shift, code, string});

    return true;
  }

  return (
    <input onKeyUp={onKeyUp}
        placeholder="select here to type"
        type="text"
    />);
}

module.exports = input;
