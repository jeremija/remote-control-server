jest.dontMock('../navStore.js');
jest.dontMock('events');

const dispatcher = require('../../dispatcher/navDispatcher.js');
const store = require('../navStore.js');

describe('store', () => {

  let handleAction = dispatcher.register.mock.calls[0][0];
  let onChange = jest.genMockFunction();

  beforeEach(() => {
    onChange.mockClear();
    store.addListener(onChange);
  });

  afterEach(() => {
    store.removeListener(onChange);
  });

  it('should have registered to a dispatcher', () => {
    expect(typeof handleAction).toBe('function');
  });

  it('should have defaults', () => {
    expect(store.getActive()).toBe('mousepad');
    let items = store.getItems();
    expect(items.length).toBe(3);
  });

  it('should handle "nav" action', () => {
    handleAction({ type: 'nav', value: 'arrows' });
    expect(store.getActive()).toBe('arrows');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should not fail on unknown action type', () => {
    handleAction({ type: 'bla' });
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('should fail when action value is unknown', () => {
    expect(() => handleAction({ type: 'nav', value: 'bla' })).toThrow();
    expect(onChange.mock.calls.length).toBe(0);
  });

});
