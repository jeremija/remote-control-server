const React = require('react');

const keyStore = require('../store/keyStore.js');
const keyDispatcher = require('../dispatcher/keyDispatcher.js');

function buttonToggles() {

  let keyStates = keyStore.getKeyStates();
  let buttonStates = keyStore.getButtonStates();

  let buttons = ['left', 'right', 'middle'].map((button, i) => {
    let active = buttonStates[button];
    let className = button + ' ' + (active ? 'active' : '');
    function onClick() {
      keyDispatcher.dispatch({ type: 'toggle-button', button: button});
    }
    return (<span className={className} key={i} onClick={onClick}>
      {button}
    </span>);
  });

  let keys = ['control', 'shift', 'alt', 'meta'].map((key, i) => {
    let active = keyStates[key];
    let className = key + ' ' + (active ? 'active' : '');
    function onClick() {
      keyDispatcher.dispatch({ type: 'toggle-key', key: key});
    }
    return (<span className={className} key={i} onClick={onClick}>
      {key}
    </span>);
  });

  return (<div className="button-toggles">
    {buttons}
    {keys}
  </div>);
}

module.exports = buttonToggles;
