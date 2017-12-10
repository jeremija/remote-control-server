const React = require('react');
const socket = require('../socket.js');

const emitEvent = code => socket.emit('keypress', { code: code });

const buttons = [{
  className: 'icon empty-space',
  text: '\u00a0'
}, {
  className: 'icon up icon-up-open',
  handleClick: () => emitEvent(38)
}, {
  className: 'icon empty-space',
  text: '\u00a0'
}, {
  className: 'icon left icon-left-open',
  handleClick: () => emitEvent(37),
}, {
  className: 'icon ok icon-check',
  handleClick: () => emitEvent(13)
}, {
  className: 'icon right icon-right-open',
  handleClick: () => emitEvent(39)
}, {
  className: 'icon escape icon-cancel',
  handleClick: () => emitEvent(27),
}, {
  className: 'icon down icon-down-open',
  handleClick: () => emitEvent(40)
}, {
  className: 'icon backspace icon-level-up',
  handleClick: () => emitEvent(8),
}];

function arrows() {
  let buttonElements = buttons.map((button, index) => {
    return (
      <span
        className={button.className}
        key={index}
        onClick={button.handleClick}
      >{button.text}</span>
    );
  });

  return (
    <div className="arrows">
      <div className="buttons">
        {buttonElements}
      </div>
    </div>
  );
}

module.exports = arrows;
