const c = require('../constants')

const keyMapping = {
  9: 'tab',
  8: 'backspace',
  13: 'enter',
  27: 'escape',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

const pressedToState = {
  true: 'down',
  false: 'up'
}

module.exports = function (socket, robot) {
  function moveMouse (pos) {
    let mouse = robot.getMousePos()
    let x = mouse.x + pos.x
    let y = mouse.y + pos.y
    robot.moveMouse(x, y)
  }

  function scrollMouse (pos) {
    let direction = pos.y > 0 ? 'down' : 'up'
    robot.scrollMouse(1, direction)
  }

  socket.on(c.WS_KEY_TAP, key => {
    robot.keyTap(key)
  })

  socket.on(c.WS_MOUSE_MOVE, ({ x, y, scroll }) => {
    if (!scroll) {
      moveMouse({ x, y })
      return
    }
    scrollMouse({ x, y })
  })

  socket.on(c.WS_MOUSE_CLICK, params => {
    robot.mouseClick(params.button, params.double)
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

    let specialKey = keyMapping[code]
    if (string) {
      robot.typeString(string)
    }
    if (specialKey) {
      robot.keyTap(specialKey)
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
