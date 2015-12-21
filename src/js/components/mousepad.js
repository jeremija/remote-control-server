const React = require('react');
const socket = require('../socket.js');
const _ = require('underscore');

const buttons = {
  0: 'left',
  1: 'middle',
  2: 'right'
};

function onClick(event) {
  let button = buttons[event.button] || 'left';
  socket.emit('click', { button: button, double: false });
}

function onDoubleClick(event) {
  let button = buttons[event.button] || 'left';
  socket.emit('click', { button: button, double: true });
}

function mousepad({throttle}) {
  let lastX, lastY;

  function onMouseEnter({clientX, clientY}) {
    lastX = clientX;
    lastY = clientY;
  }

  function handleMouse(posX, posY, scroll) {
    let x = posX - lastX;
    let y = posY - lastY;

    if (scroll && Math.abs(y) < 5) return;

    lastX = posX;
    lastY = posY;

    socket.emit('mousemove', {x, y}, scroll);
  }

  function onMouseMove({clientX, clientY}) {
    handleMouse(clientX, clientY);
  }

  let timeout;

  function onTouchStart(event) {
    event.persist();
    let touch = event.touches[0];
    lastX = touch.clientX;
    lastY = touch.clientY;

    clearTimeout(timeout);
    timeout = setTimeout(() => event.preventDefault(), 50);
  }

  function onTouchEnd() {
    clearTimeout(timeout);
  }

  function _onTouchMove(event) {
    event.preventDefault();
    let touch = event.touches[0];
    let scroll = event.touches.length > 1;
    handleMouse(touch.clientX, touch.clientY, scroll);
  }

  const onTouchMove = _.throttle(_onTouchMove, 5);

  return (
    <div className="mousepad"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      <span className="icon icon-mouse" />
    </div>
  );

}

module.exports = mousepad;
