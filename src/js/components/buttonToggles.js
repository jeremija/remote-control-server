const React = require('react');

const socket = require('../socket.js');
const keyStore = require('../store/keyStore.js');
const keyDispatcher = require('../dispatcher/keyDispatcher.js');

function buttonToggles() {

  let keyStates = keyStore.getKeyStates();
  let buttonStates = keyStore.getButtonStates();

  let buttons = ['left', 'right', 'middle'].map((button, i) => {
    let active = buttonStates[button];
    let className = button + ' ' + (active ? 'active' : '');
    function onClick() {
      socket.emit('toggle-button', button, active ? 'up' : 'down');
      keyDispatcher.dispatch({ type: 'toggle-button', button: button});
    }
    return (<button className={className} key={i} onClick={onClick}>
      {button}
    </button>);
  });

  let keys = ['control', 'shift', 'alt', 'meta'].map((key, i) => {
    let active = keyStates[key];
    let className = key + ' ' + (active ? 'active' : '');
    function onClick() {
      socket.emit('toggle-key', key, active ? 'up' : 'down');
      keyDispatcher.dispatch({ type: 'toggle-key', key: key});
    }
    return (<button className={className} key={i} onClick={onClick}>
      {key}
    </button>);
  });

  return (<div className="button-toggles">
    {buttons}
    {keys}
  </div>);
}

module.exports = buttonToggles;
