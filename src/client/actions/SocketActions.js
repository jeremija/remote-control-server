const c = require('../../constants')
const socket = require('../socket')

module.exports = {
  keyPress (payload) {
    socket.emit(c.WS_KEY_PRESS, payload)
  },
  keyToggle (payload) {
    socket.emit(c.WS_KEY_TOGGLE, payload)
  },
  mouseMove (payload) {
    socket.emit(c.WS_MOUSE_MOVE, payload)
  },
  mouseClick (payload) {
    socket.emit(c.WS_MOUSE_CLICK, payload)
  },
  mouseToggle (payload) {
    socket.emit(c.WS_MOUSE_TOGGLE, payload)
  }
}
