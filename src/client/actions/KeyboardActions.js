const c = require('../../constants')
const socket = require('../socket')

export function press ({ alt, ctrl, shift, meta, code, string }) {
  socket.emit(c.WS_KEY_PRESS, { alt, ctrl, shift, meta, code, string })
}

export function toggle ({ key, pressed = true }) {
  socket.emit(c.WS_KEY_TOGGLE, { key, pressed })
  return {
    type: c.KEYBOARD_TOGGLE,
    payload: { key, pressed }
  }
}
