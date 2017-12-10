const dispatcher = require('../dispatcher/keyDispatcher.js');
const EventEmitter = require('events');
const socket = require('../socket.js');

const emitter = new EventEmitter();

const addListener = cb => emitter.on('change', cb);
const removeListener = cb => emitter.removeListener('change', cb);

const buttonStates = {
  left: false,
  right: false,
  middle: false
};

const keyStates = {
  control: false,
  alt: false,
  shift: false,
  meta: false
};

const handlers = {
  'toggle-button': ({ button }) => {
    let state = buttonStates[button];
    if (state === undefined) return;
    socket.emit('toggle-button', button, state ? 'up' : 'down');
    buttonStates[button] = !state;
  },
  'toggle-key': ({ key }) => {
    let state = keyStates[key];
    if (state === undefined) return;
    socket.emit('toggle-key', key, state ? 'up' : 'down');
    keyStates[key] = !state;
  }
};

const getKeyStates = () => keyStates;
const getButtonStates = () => buttonStates;

const dispatcherIndex = dispatcher.register(action => {
  let handle = handlers[action.type];
  if (!handle) return;
  handle(action);
  emitter.emit('change');
});

module.exports = {
  dispatcherIndex,
  addListener,
  removeListener,
  getKeyStates,
  getButtonStates
};
