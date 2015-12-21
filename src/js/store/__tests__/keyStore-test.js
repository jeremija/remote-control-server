jest.dontMock('../keyStore.js');
jest.dontMock('events');

const dispatcher = require('../../dispatcher/keyDispatcher.js');
const keyStore = require('../keyStore.js');

describe('keyStore', () => {

  let handleAction = dispatcher.register.mock.calls[0][0];
  let onChange = jest.genMockFunction();

  beforeEach(() => {
    onChange.mockClear();
    keyStore.addListener(onChange);
  });
  afterEach(() => keyStore.removeListener(onChange));

  it('should hold key and button states', () => {
    expect(keyStore.getKeyStates()).toEqual({
      control: false,
      alt: false,
      shift: false,
      meta: false
    });

    expect(keyStore.getButtonStates()).toEqual({
      left: false,
      right: false,
      middle: false
    });
  });

  it('should gracefully handle unknown action types', () => {
    handleAction({ type: 'bla' });
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('should gracefully handle unknown keys', () => {
    handleAction({ type: 'toggle-key', key: 'hfgda' });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should gracefully handle unknown buttons', () => {
    handleAction({ type: 'toggle-button', button: 'hfgda' });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should handle "toggle-key" action', () => {
    handleAction({ type: 'toggle-key', key: 'control' });

    expect(onChange.mock.calls.length).toBe(1);
    expect(keyStore.getKeyStates()).toEqual({
      control: true,
      alt: false,
      shift: false,
      meta: false
    });

    handleAction({ type: 'toggle-key', key: 'control' });

    expect(onChange.mock.calls.length).toBe(2);
    expect(keyStore.getKeyStates()).toEqual({
      control: false,
      alt: false,
      shift: false,
      meta: false
    });
  });

  it('should handle "toggle-button" action', () => {
    handleAction({ type: 'toggle-button', button: 'left' });

    expect(onChange.mock.calls.length).toBe(1);
    expect(keyStore.getButtonStates()).toEqual({
      left: true,
      right: false,
      middle: false
    });

    handleAction({ type: 'toggle-button', button: 'left' });

    expect(onChange.mock.calls.length).toBe(2);
    expect(keyStore.getButtonStates()).toEqual({
      left: false,
      right: false,
      middle: false
    });
  });

});
