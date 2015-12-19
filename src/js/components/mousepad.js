const React = require('react');
const socket = require('../socket.js');


function onClick(event) {
  socket.emit('click', { button: 'left', double: false });
}

function onDblClick(event) {
  socket.emit('click', { button: 'left', double: true });
}

function mousepad({throttle}) {
  let lastX, lastY;
  let lastMouseSent = Date.now();

  function onMouseEnter({clientX, clientY}) {
    lastX = clientX;
    lastY = clientY;
  }

  function handleMouse(posX, posY) {
    let x = posX - lastX;
    let y = posY - lastY;

    lastX = posX;
    lastY = posY;

    if (throttle && Date.now() - lastMouseSent < throttle) return false;

    socket.emit('mousemove', {x, y});
    lastMouseSent = Date.now();
    return false;
  }

  function onMouseMove({clientX, clientY}) {
    return handleMouse(clientX, clientY);
  }

  function onTouchStart(event) {
    let touch = event.touches[0];
    lastX = touch.clientX;
    lastY = touch.clientY;
  }

  function onTouchMove(event) {
    event.preventDefault();
    let touch = event.touches[0];
    return handleMouse(touch.clientX, touch.clientY);
  }

  return (
    <div className="mousepad"
        onClick={onClick}
        onDblClick={onDblClick}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
    />);

}

module.exports = mousepad;
