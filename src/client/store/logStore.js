const EventEmitter = require('events');
const dispatcher = require('../dispatcher/logDispatcher.js');

const emitter = new EventEmitter();

const addListener = cb => emitter.on('change', cb);
const removeListener = cb => emitter.removeListener('change', cb);
const getLogs = () => logs;

let logs = [];

let handlers = {
  clear: () => logs = [],
  'add-entry': ({ text }) => {
    logs.splice(0, 0, text);
    if (logs.length > 10) logs.pop();
  }

};

const dispatcherIndex = dispatcher.register(action => {
  let handle = handlers[action.type];
  if (!handle) return;
  handle(action);
  emitter.emit('change');
});

module.exports = { dispatcherIndex, addListener, removeListener, getLogs };
