const React = require('react');
const socket = require('../socket.js');

function input() {

  function onKeyUp(event) {
    let alt = event.altKey || false;
    let ctrl = event.ctrlKey || false;
    let shift = event.shiftKey || false;
    let meta = event.metaKey || false;
    let code = event.which || event.keyCode;
    let string = event.target.value;
    event.target.value = '';
    socket.emit('keypress', {alt, ctrl, shift, meta, code, string});

    return true;
  }

  return (
    <div className="input">
      <input onKeyUp={onKeyUp}
        placeholder={String.fromCharCode(parseInt('e803', 16))}
        type="text"
      />
    </div>);
}

module.exports = input;
