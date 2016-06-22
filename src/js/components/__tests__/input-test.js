jest.dontMock('../input.js');

const socket = require('../../socket.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Input = require('../input.js');

describe('input', () => {

  beforeEach(() => {
    socket.emit.mockClear();
  });

  function render() {
    let component = TestUtils.renderIntoDocument(
      <div> <Input /> </div>
    );

    return ReactDOM.findDOMNode(component).querySelector('input');
  }

  it('should render input element', () => {
    let node = render();
    expect(node).toBe.ok;
  });

  it('should listen to keyup event and send keypress to socket', () => {
    let event = { keyCode: 65, target: { value: 'A' } };
    let node = render();

    TestUtils.Simulate.keyUp(node, event);

    expect(socket.emit.mock.calls.length).toBe(1);
    expect(socket.emit.mock.calls[0][0]).toBe('keypress');
    expect(socket.emit.mock.calls[0][1]).toEqual({
      alt: false,
      ctrl: false,
      shift: false,
      meta: false,
      code: 65,
      string: 'A'
    });
    expect(event.target.value).toBe('');
  });

});
