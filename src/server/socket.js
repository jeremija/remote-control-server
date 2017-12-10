'use strict'

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

  socket.on('keytap', key => {
    robot.keyTap(key)
  })

  socket.on('mousemove', (pos, scroll) => {
    if (!scroll) {
      moveMouse(pos)
      return
    }
    scrollMouse(pos)
  })

  socket.on('click', params => {
    robot.mouseClick(params.button, params.double)
  })

  socket.on('keypress', action => {
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

  socket.on('toggle-key', (key, state) => {
    if (key === 'meta') key = 'command'
    robot.keyToggle(key, state)
  })

  socket.on('toggle-button', (button, state) => {
    robot.mouseToggle(state, button)
  })
}
