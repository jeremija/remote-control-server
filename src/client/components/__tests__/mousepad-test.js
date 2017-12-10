jest.dontMock('../mousepad.js');
jest.dontMock('underscore');

const socket = require('../../socket.js');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Mousepad = require('../mousepad.js');

describe('input', () => {

  beforeEach(() => {
    socket.emit.mockClear();
  });

  function render(props) {
    props = props || {};
    let component = TestUtils.renderIntoDocument(
      <div> <Mousepad {...props} /> </div>
    );

    return ReactDOM.findDOMNode(component).querySelector('.mousepad');
  }

  it('should render .mousepad element', () => {
    let node = render();
    expect(node).toBe.ok;
  });

  it('it should listen to onClick event', () => {
    let node = render();

    ['left', 'middle', 'right', undefined].forEach((buttonName, index) => {
      let event = {button: index};

      TestUtils.Simulate.click(node, event);

      expect(socket.emit.mock.calls.length).toBe(index + 1);
      expect(socket.emit.mock.calls[index][0]).toBe('click');
      expect(socket.emit.mock.calls[index][1]).toEqual({
        button: buttonName || 'left',
        double: false
      });
    });
  });

  it('it should listen to onDblClick event', () => {
    let node = render();

    ['left', 'middle', 'right', undefined].forEach((buttonName, index) => {
      let event = {button: index};

      TestUtils.Simulate.doubleClick(node, event);

      expect(socket.emit.mock.calls.length).toBe(index + 1);
      expect(socket.emit.mock.calls[index][0]).toBe('click');
      expect(socket.emit.mock.calls[index][1]).toEqual({
        button: buttonName || 'left',
        double: true
      });
    });
  });

  it('should listen to onMouseEnter and onMouseMove events', () => {
    let node = render();
    let event1 = { clientX: 30, clientY: 50 };
    let event2 = { clientX: 45, clientY: 32 };

    TestUtils.Simulate.mouseEnter(node, event1);
    TestUtils.Simulate.mouseMove(node, event2);

    expect(socket.emit.mock.calls.length).toBe(1);
    expect(socket.emit.mock.calls[0][0]).toBe('mousemove');
    expect(socket.emit.mock.calls[0][1]).toEqual({ x: 15, y: -18 });
  });

  it('should listen to onTouchStart and onTouchMove events', () => {
    let node = render();
    let event1 = {
      touches: [{ clientX: 30, clientY: 50 }],
      preventDefault: jest.genMockFunction()
    };
    let event2 = { touches: [{ clientX: 45, clientY: 32 }] };

    TestUtils.Simulate.touchStart(node, event1);
    TestUtils.Simulate.touchMove(node, event2);

    expect(socket.emit.mock.calls.length).toBe(1);
    expect(socket.emit.mock.calls[0][0]).toBe('mousemove');
    expect(socket.emit.mock.calls[0][1]).toEqual({ x: 15, y: -18 });
    expect(socket.emit.mock.calls[0][2]).toBe(false);
  });

  it('should listen to scroll touch events', () => {
    let node = render();
    let event1 = { touches: [{ clientX: 30, clientY: 50 }] };
    let event2 = { touches: [{ clientX: 45, clientY: 32 }, {}] };

    TestUtils.Simulate.touchStart(node, event1);
    TestUtils.Simulate.touchMove(node, event2);

    expect(socket.emit.mock.calls.length).toBe(1);
    expect(socket.emit.mock.calls[0][0]).toBe('mousemove');
    expect(socket.emit.mock.calls[0][1]).toEqual({ x: 15, y: -18 });
    expect(socket.emit.mock.calls[0][2]).toBe(true);
  });

  it('should ignore scroll where diff < 5px', () => {
    let node = render();
    let event1 = { touches: [{ clientX: 30, clientY: 30 }] };
    let event2 = { touches: [{ clientX: 45, clientY: 28 }, {}] };

    TestUtils.Simulate.touchStart(node, event1);
    TestUtils.Simulate.touchMove(node, event2);

    expect(socket.emit.mock.calls.length).toBe(0);
  });

  it('should not fail onTouchEnd', () => {
    let node = render();
    TestUtils.Simulate.touchEnd(node);
  });

  it('should call event#preventDefault if no touch end', () => {
    let node = render();
    let event1 = {
      touches: [{ clientX: 30, clientY: 50 }],
      preventDefault: jest.genMockFunction()
    };

    TestUtils.Simulate.touchStart(node, event1);

    expect(event1.preventDefault).not.toBeCalled();
    jest.runAllTimers();
    expect(event1.preventDefault).toBeCalled();
  });

  it('should not call event#preventDefault() if touch end', () => {
    let node = render();
    let event1 = {
      touches: [{ clientX: 30, clientY: 50 }],
      preventDefault: jest.genMockFunction()
    };

    TestUtils.Simulate.touchStart(node, event1);
    TestUtils.Simulate.touchEnd(node);

    jest.runAllTimers();
    expect(event1.preventDefault).not.toBeCalled();
  });

  // it('should throttle touch move events', () => {
  //   let node = render({ throttle: 5 });

  //   let event1 = { touches: [{ clientX: 30, clientY: 50 }] };
  //   TestUtils.Simulate.touchStart(node, event1);

  //   for (let i = 0; i < 100; i++) {
  //     let event2 = { touches: [{ clientX: 45, clientY: 32 }] };
  //     TestUtils.Simulate.touchMove(node, event2);
  //   }

  //   expect(socket.emit.mock.calls.length).toBeGreaterThan(0);
  //   expect(socket.emit.mock.calls.length).toBeLessThan(20);
  // });

  // it('should not throttle mouse move events when throttle is 0', () => {
  //   let node = render({ throttle: 0 });

  //   let event1 = { clientX: 30, clientY: 50 };
  //   TestUtils.Simulate.mouseEnter(node, event1);

  //   for (let i = 0; i < 100; i++) {
  //     let event2 = { clientX: 45, clientY: 32 };
  //     TestUtils.Simulate.mouseMove(node, event2);
  //   }

  //   expect(socket.emit.mock.calls.length).toEqual(100);
  // });

  // it('should listen to onDragStart and onDragMove events');

});
