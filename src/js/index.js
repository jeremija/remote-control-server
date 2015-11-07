'use strict';
let socket = require('socket.io-client')();
let $ = require('npm-zepto');

let $mouseBox = $('.mouse-box');
let $input = $('input');

let touchX, touchY;
let lastMouseSent = Date.now();

$mouseBox.on('mousemove', event => {
  let x = event.movementX;
  let y = event.movementY;
  socket.emit('mousemove', {x, y});
})
.on('touchstart', event => {
  let touch = event.touches[0];
  touchX = touch.clientX;
  touchY = touch.clientY;
})
.on('touchmove', event => {
  let touch = event.touches[0];
  let x = touch.clientX - touchX;
  let y = touch.clientY - touchY;

  touchX = touch.clientX;
  touchY = touch.clientY;

  if (Date.now() - lastMouseSent < 10) {
    return false;
  }
  socket.emit('mousemove', {x, y});
  lastMouseSent = Date.now();

  return false;
})
.on('click', () => socket.emit('click', { button: 'left', double: false }))
.on('dblclick', () => socket.emit('click', { button: 'left', double: true }));

let altKey = false, ctrlKey = false, shiftKey = false;

$input.on('keyup', event => {
  let alt = event.altKey || altKey;
  let ctrl = event.ctrlKey || ctrlKey;
  let shift = event.shiftKey || shiftKey;
  let code = event.which || event.keyCode;
  let string = event.target.value;
  event.target.value = '';
  socket.emit('keypress', {alt, ctrl, shift, code, string});
  return true;
});
