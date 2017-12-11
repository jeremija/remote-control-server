jest.mock('robotjs')
jest.mock('../client/socket')

const SocketActions = require('../client/actions/SocketActions')
const clientSocket = require('../client/socket')
const handleSocket = require('./socket')
const robot = require('robotjs')
const { EventEmitter } = require('events')

const KEY_MAPPING = handleSocket.KEY_MAPPING

describe('socket', () => {
  let socket
  beforeEach(() => {
    socket = new EventEmitter()
    handleSocket(socket, robot)

    clientSocket.emit.mockImplementation(function () {
      socket.emit.apply(socket, arguments)
    })

    robot.mouseClick.mockClear()
    robot.moveMouse.mockClear()
    robot.typeString.mockClear()
    robot.keyTap.mockClear()
    robot.keyToggle.mockClear()
    robot.mouseToggle.mockClear()
    robot.scrollMouse.mockClear()
  })

  it('should be a function', () => {
    expect(typeof handleSocket).toBe('function')
  })

  describe('keyPress', () => {
    it('sends type events', () => {
      SocketActions.keyPress({
        string: 't'
      })
      expect(robot.typeString.mock.calls).toEqual([[ 't' ]])
    })

    Object.keys(KEY_MAPPING).forEach(code => {
      it(`sends special key codes: ${code}`, () => {
        SocketActions.keyPress({ code })
        const key = KEY_MAPPING[code]
        expect(key).toEqual(jasmine.any(String))
        expect(robot.keyTap.mock.calls).toEqual([[ key ]])
        robot.keyTap.mockClear()
      })
    })

    it('sends backspace when no special key and empty string', () => {
      // hack for android
      SocketActions.keyPress({
        string: '',
        keyCode: 229
      })
      expect(robot.keyTap.mock.calls).toEqual([[ 'backspace' ]])
    })

    const MODIFIER_MAPPING = {
      ctrl: 'control',
      meta: 'command',
      shift: 'shift',
      alt: 'alt'
    }
    ;['ctrl', 'alt', 'shift', 'meta'].forEach(key => {
      it(`sends modifier information: ${key}`, () => {
        SocketActions.keyPress({
          [key]: true,
          string: 't'
        })
        expect(robot.keyToggle.mock.calls).toEqual([
          [ MODIFIER_MAPPING[key], 'down' ],
          [ MODIFIER_MAPPING[key], 'up' ]
        ])
        expect(robot.typeString.mock.calls).toEqual([[ 't' ]])
      })
    })
  })

  describe('keyToggle', () => {

    it('presses a key', () => {
      SocketActions.keyToggle({ key: 'control', pressed: true })
      expect(robot.keyToggle.mock.calls).toEqual([[ 'control', 'down' ]])
    })

    it('unpresses a key', () => {
      SocketActions.keyToggle({ key: 'control', pressed: false })
      expect(robot.keyToggle.mock.calls).toEqual([[ 'control', 'up' ]])
    })

    it('renames meta to command', () => {
      SocketActions.keyToggle({ key: 'meta', pressed: false })
      expect(robot.keyToggle.mock.calls).toEqual([[ 'command', 'up' ]])
    })

  })

  describe('mouseClick', () => {

    it('clicks', () => {
      SocketActions.mouseClick({ button: 'left', double: true })
      expect(robot.mouseClick.mock.calls).toEqual([[ 'left', true ]])
    })

  })

  describe('mouseMove', () => {

    beforeEach(() => {
      robot.getMousePos.mockReturnValue({ x: 5, y: 10 })
    })

    it('moves mouse when scroll = false', () => {
      SocketActions.mouseMove({ x: 7, y: 13, scroll: false })
      expect(robot.moveMouse.mock.calls).toEqual([[ 5 + 7, 13 + 10 ]])
    })

    it('scrolls up when scroll = true and direction positive', () => {
      SocketActions.mouseMove({ x: 0, y: 1, scroll: true })
      expect(robot.scrollMouse.mock.calls).toEqual([[ 0, 1 ]])
    })

    it('scrolls down when scroll = false and direction negative', () => {
      SocketActions.mouseMove({ x: 0, y: -1, scroll: true })
      expect(robot.scrollMouse.mock.calls).toEqual([[ 0, -1 ]])
    })

  })

  describe('mouseToggle', () => {

    it('presses a mouse button', () => {
      SocketActions.mouseToggle({ button: 'left', pressed: true })
      expect(robot.mouseToggle.mock.calls).toEqual([[ 'down', 'left' ]])
    })

    it('unpresses a mouse button', () => {
      SocketActions.mouseToggle({ button: 'left', pressed: false })
      expect(robot.mouseToggle.mock.calls).toEqual([[ 'up', 'left' ]])
    })

  })

})
