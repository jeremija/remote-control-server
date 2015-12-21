jest.dontMock('../logStore.js');
jest.dontMock('events');

const dispatcher = require('../../dispatcher/logDispatcher.js');

const logStore = require('../logStore.js');

describe('logStore', () => {

  const handleAction = dispatcher.register.mock.calls[0][0];

  let listener;
  beforeEach(() => {
    listener = jest.genMockFunction();
    logStore.addListener(listener);
  });

  afterEach(() => {
    logStore.removeListener(listener);
  });

  it('should listen to dispatcher\'s events', () => {
    expect(typeof handleAction).toBe('function');
  });

  it('should not fail on unknown action type', () => {
    handleAction({ type: 'bla' });
    expect(listener.mock.calls.length).toBe(0);
  });


  describe('add-entry', () => {
    it('should add log entry', () => {
      handleAction({ type: 'add-entry', text: 'my log entry' });
      expect(logStore.getLogs()).toEqual(['my log entry']);

      expect(listener.mock.calls.length).toBe(1);
    });

    it('should add a log entry to beginning', () => {
      handleAction({ type: 'add-entry', text: 'my second log entry' });
      expect(logStore.getLogs()).toEqual(
        ['my second log entry', 'my log entry']
      );
      expect(listener.mock.calls.length).toBe(1);
    });

    it('should cycle logs after 10', () => {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((item, index) =>
        handleAction({ type: 'add-entry', text: 'my log' + index }));
      expect(logStore.getLogs().length).toBe(10);
      expect(listener.mock.calls.length).toBe(12);
    });
  });

  describe('clear', () => {
    it('should clear all log entries', () => {
      [1, 2, 3, 4].forEach((item, index) =>
        handleAction({ type: 'add-entry', text: 'my log' + index }));

      handleAction({ type: 'clear' });

      expect(logStore.getLogs().length).toBe(0);
      expect(listener.mock.calls.length).toBe(5);
    });
  });

});
