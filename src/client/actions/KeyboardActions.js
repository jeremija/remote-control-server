const c = require('../../constants')
const socket = require('../socket')

export function press ({ alt, ctrl, shift, meta, code, string }) {
  socket.emit(c.WS_KEYBORAD_PRESS, { alt, ctrl, shift, meta, code, string })
}

export function toggle ({ key, pressed = true }) {
  return {
    type: c.WS_KEY_TOGGLE,
    payload: { key, pressed }
  }
}
