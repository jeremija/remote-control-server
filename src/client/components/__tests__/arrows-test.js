jest.dontMock('../arrows.js');

const socket = require('../../socket.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Arrows = require('../arrows.js');

describe('arrows', () => {

  beforeEach(() => {
    socket.emit.mockClear();
  });

  function render() {
    let component = TestUtils.renderIntoDocument(
      <div><Arrows /></div>
    );

    return ReactDOM.findDOMNode(component).children[0];
  }

  it('should render arrows element', () => {
    let node = render();
    expect(node).toBe.ok;
  });

  it('should emit up key event on click', () => {
    let node = render();
    let buttons = [
      '.up', '.left', '.ok', '.right', '.down', '.backspace', '.escape'
    ];
    let codes = [38, 37, 13, 39, 40, 8, 27];

    buttons.forEach((button, index) => {
      let el = node.querySelector(button);
      TestUtils.Simulate.click(el);
      expect(socket.emit.mock.calls[index]).toEqual([
        'keypress', { code: codes[index] }
      ]);
    });
  });

});

