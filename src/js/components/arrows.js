const React = require('react');
const socket = require('../socket.js');

const emitEvent = code => socket.emit('keypress', { code: code });

const buttons = [{
  className: 'escape',
  handleClick: () => emitEvent(27),
  text: 'ESC'
}, {
  className: 'icon up icon-up-open-big',
  handleClick: () => emitEvent(38)
}, {
  className: 'backspace',
  handleClick: () => emitEvent(8),
  text: 'BKS'
}, {
  className: 'icon left icon-left-open-big',
  handleClick: () => emitEvent(37),
}, {
  className: 'icon ok icon-ok-circle',
  handleClick: () => emitEvent(13)
}, {
  className: 'icon right icon-right-open-big',
  handleClick: () => emitEvent(39)
}, {
  className: 'blank',
}, {
  className: 'icon down icon-down-open-big',
  handleClick: () => emitEvent(40)
}, {
  className: 'blank',
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

  return <div className="buttons">{buttonElements}</div>;
}

module.exports = arrows;
