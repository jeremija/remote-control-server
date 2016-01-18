jest.dontMock('../buttonToggles.js');
jest.dontMock('bufferutil');

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

  it('should send key tap on click', () => {
    let node = render();
    ['.control', '.alt'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.click(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'tap-key', key: name
      });
    });
  });

  it('should send mouse click on click', () => {
    let node = render();
    ['.left', '.right'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.click(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'click', button: name
      });
    });
  });

  it('should toggle state on key doubleClick', () => {
    let node = render();
    ['.control', '.alt'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.doubleClick(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'toggle-key', key: name
      });
    });
  });

  it('should toggle state on btn doubleClick', () => {
    let node = render();
    ['.left', '.right'].forEach((className, index) => {
      let name = className.substring(1);
      TestUtils.Simulate.doubleClick(node.querySelector(className));

      expect(keyDispatcher.dispatch.mock.calls.length).toBe(index + 1);
      expect(keyDispatcher.dispatch.mock.calls[index][0]).toEqual({
        type: 'toggle-button', button: name
      });
    });
  });
});
