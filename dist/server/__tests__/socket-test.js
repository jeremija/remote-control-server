jest.dontMock('../socket.js');

const robot = jest.genMockFromModule('robotjs');
const handleSocket = require('../socket.js');

describe('socket', () => {

  let socket;
  beforeEach(() => {
    socket = {
      on: jest.genMockFunction()
    };
    handleSocket(socket, robot);

    robot.mouseClick.mockClear();
    robot.moveMouse.mockClear();
    robot.typeString.mockClear();
    robot.keyTap.mockClear();
    robot.keyToggle.mockClear();
    robot.mouseToggle.mockClear();
  });

  function findHandler(name) {
    let call = socket.on.mock.calls.find(call => call[0] === name);
    return call[1];
  }

  it('should be a function', () => {
    expect(typeof handleSocket).toBe('function');
  });

  it('should add handlers for events', () => {
    expect(socket.on.mock.calls.length).toBeGreaterThan(0);
  });

  it('should add click handler', () => {
    let handleClick = findHandler('click');
    expect(typeof handleClick).toBe('function');

    handleClick({ button: 'left', double: true });

    expect(robot.mouseClick.mock.calls.length).toBe(1);
    expect(robot.mouseClick.mock.calls[0][0]).toBe('left');
    expect(robot.mouseClick.mock.calls[0][1]).toBe(true);
  });

  it('should add mousemove handler', () => {
    let handleMouseMove = findHandler('mousemove');
    expect(typeof handleMouseMove).toBe('function');
    robot.getMousePos.mockReturnValue({ x: 15, y: 19 });

    handleMouseMove({ x: 10, y: 20 });

    expect(robot.moveMouse.mock.calls.length).toBe(1);
    expect(robot.moveMouse.mock.calls[0][0]).toBe(25);
    expect(robot.moveMouse.mock.calls[0][1]).toBe(39);
  });

  it('should add scroll handler', () => {
    let handleMouseMove = findHandler('mousemove');
    expect(typeof handleMouseMove).toBe('function');

    handleMouseMove({ x: 10, y: 10 }, true);

    expect(robot.scrollMouse.mock.calls.length).toBe(1);
    expect(robot.scrollMouse.mock.calls[0]).toEqual([1, 'down']);

    handleMouseMove({ x: 10, y: -10 }, true);

    expect(robot.scrollMouse.mock.calls.length).toBe(2);
    expect(robot.scrollMouse.mock.calls[1]).toEqual([1, 'up']);
  });

  it('should add keytap handler', () => {
    let handle = findHandler('keytap');
    expect(typeof handle).toBe('function');
    robot.getMousePos.mockReturnValue({ x: 15, y: 19 });

    handle('right');

    expect(robot.keyTap.mock.calls).toEqual([['right']]);
  });

  it('should add keypress handler', () => {
    let handleKeypress = findHandler('keypress');
    expect(typeof handleKeypress).toBe('function');

    handleKeypress({
      alt: false,
      ctrl: false,
      shift: false,
      meta: false,
      string: 'A',
      code: 65
    });

    expect(robot.typeString.mock.calls.length).toBe(1);
    expect(robot.typeString.mock.calls[0][0]).toBe('A');
  });

  it('should add keytap handler for special keys', () => {
    let handleKeypress = findHandler('keypress');
    expect(typeof handleKeypress).toBe('function');

    handleKeypress({
      alt: true,
      ctrl: true,
      shift: true,
      meta: true,
      string: 'A',
      code: 65
    });

    expect(robot.typeString.mock.calls.length).toBe(1);
    expect(robot.typeString.mock.calls[0][0]).toBe('A');

    expect(robot.keyToggle.mock.calls).toEqual([
      ['alt', 'down'],
      ['control', 'down'],
      ['shift', 'down'],
      ['command', 'down'],
      ['alt', 'up'],
      ['control', 'up'],
      ['shift', 'up'],
      ['command', 'up'],
    ]);
  });

  it('should add keytap handler for return, tab or backspace', () => {
    let handleKeypress = findHandler('keypress');
    expect(typeof handleKeypress).toBe('function');

    handleKeypress({ code: 9 });
    handleKeypress({ code: 13 });
    handleKeypress({ code: 8 });

    expect(robot.keyTap.mock.calls).toEqual([
      ['tab'],
      ['enter'],
      ['backspace']
    ]);
  });

  it('should add toggle-key handler', () => {
    let handleToggleKey = findHandler('toggle-key');
    expect(typeof handleToggleKey).toBe('function');

    handleToggleKey('control', 'down');

    expect(robot.keyToggle.mock.calls[0]).toEqual(['control', 'down']);
  });

  it('should rename meta key to command', () => {
    let handleToggleKey = findHandler('toggle-key');
    expect(typeof handleToggleKey).toBe('function');

    handleToggleKey('meta', 'down');

    expect(robot.keyToggle.mock.calls[0]).toEqual(['command', 'down']);
  });

  it('should add toggle-button handler', () => {
    let handleToggleButton = findHandler('toggle-button');
    expect(typeof handleToggleButton).toBe('function');

    handleToggleButton('left', 'down');

    expect(robot.mouseToggle.mock.calls[0]).toEqual(['down', 'left']);
  });

});
