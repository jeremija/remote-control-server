const c = require('../constants')
const Immutable = require('seamless-immutable')

const KEY_MAPPING = Immutable({
  9: 'tab',
  8: 'backspace',
  13: 'enter',
  27: 'escape',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
})

const pressedToState = {
  true: 'down',
  false: 'up'
}

module.exports = function (socket, robot) {
  function moveMouse ({ x, y }) {
    const { x: X, y: Y } = robot.getMousePos()
    robot.moveMouse(X + x, Y + y)
  }

  function scrollMouse ({ x, y }) {
    y = y > 0 ? 1 : -1
    robot.scrollMouse(0, y)
  }

  socket.on(c.WS_MOUSE_MOVE, ({ x, y, scroll }) => {
    if (!scroll) {
      moveMouse({ x, y })
      return
    }
    scrollMouse({ x, y })
  })

  socket.on(c.WS_MOUSE_CLICK, ({ button, double }) => {
    robot.mouseClick(button, double)
  })

  socket.on(c.WS_KEY_PRESS, action => {
    let alt = action.alt
    let ctrl = action.ctrl
    let shift = action.shift
    let meta = action.meta
    let code = action.code
    let string = action.string

    if (alt) robot.keyToggle('alt', 'down')
    if (ctrl) robot.keyToggle('control', 'down')
    if (shift) robot.keyToggle('shift', 'down')
    if (meta) robot.keyToggle('command', 'down')

    let specialKey = KEY_MAPPING[code]
    if (string) {
      robot.typeString(string)
    } else if (specialKey) {
      robot.keyTap(specialKey)
    } else {
      // Hack for android where key code is always 229. We use the backspace
      // when the string is empty.
      robot.keyTap('backspace')
    }

    if (alt) robot.keyToggle('alt', 'up')
    if (ctrl) robot.keyToggle('control', 'up')
    if (shift) robot.keyToggle('shift', 'up')
    if (meta) robot.keyToggle('command', 'up')
    return false
  })

  socket.on(c.WS_KEY_TOGGLE, ({ key, pressed }) => {
    const state = pressedToState[!!pressed]
    if (key === 'meta') key = 'command'
    robot.keyToggle(key, state)
  })

  socket.on(c.WS_MOUSE_TOGGLE, ({ button, pressed }) => {
    const state = pressedToState[!!pressed]
    robot.mouseToggle(state, button)
  })
}

module.exports.KEY_MAPPING = KEY_MAPPING
