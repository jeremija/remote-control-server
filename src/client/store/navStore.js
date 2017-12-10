const dispatcher = require('../dispatcher/navDispatcher.js');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const addListener = cb => emitter.on('change', cb);
const removeListener = cb => emitter.removeListener('change', cb);

const items = [{
  icon: 'icon-mouse',
  value: 'mousepad'
}, {
  icon: 'icon-arrows',
  value: 'arrows'
}, {
  icon: 'icon-logs',
  value: 'log'
}];
const values = items.map(item => item.value);
let active = values[0];

const getItems = () => items;
const getActive = () => active;

const handlers = {
  nav: ({ value }) => {
    if (values.indexOf(value) < 0) {
      throw new Error('nav value ' + value + ' not found in ' + values);
    }

    active = value;
  },
};

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
  getItems,
  getActive
};
