jest.dontMock('../buttonToggles.js');
jest.dontMock('bufferutil');

const socket = require('../../socket.js');
const keyStore = require('../../store/keyStore.js');
const keyDispatcher = require('../../dispatcher/keyDispatcher.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const ButtonToggles = require('../buttonToggles.js');

describe('buttonToggles', () => {

  beforeEach(() => {
    keyStore.getKeyStates.mockReturnValue({
      control: false,
      alt: true,
      shift: false,
      meta: false
    });
    keyStore.getButtonStates.mockReturnValue({
      left: false,
      right: true,
      middle: false
    });
    socket.emit.mockClear();
    keyDispatcher.dispatch.mockClear();
  });

  function render() {
    let component = TestUtils.renderIntoDocument(
      <div><ButtonToggles /></div>
    );

    return ReactDOM.findDOMNode(component).children[0];
  }

  it('should render button toggles element', () => {
    let node = render();
    expect(node).toBe.ok;
    expect(node.className).toBe('button-toggles');
  });

  it('should emit socket event and toggle state on key click', () => {
    let node = render();
    let expectedStates = {
      '.control': 'down',
      '.alt': 'up'
    };
    ['.control', '.alt'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.click(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'toggle-key', key: name
      });

      expect(socket.emit.mock.calls.length).toBe(index + 1);
      expect(socket.emit.mock.calls[index]).toEqual(
        ['toggle-key', name, expectedStates[className]]);
    });
  });

  it('should emit socket event and toggle state on btn click', () => {
    let node = render();
    let expectedStates = {
      '.left': 'down',
      '.right': 'up'
    };
    ['.left', '.right'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.click(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'toggle-button', button: name
      });

      expect(socket.emit.mock.calls.length).toBe(index + 1);
      expect(socket.emit.mock.calls[index]).toEqual(
        ['toggle-button', name, expectedStates[className]]);
    });
  });
});
