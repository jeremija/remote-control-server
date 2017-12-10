import c from '../../constants'
import socket from '../socket'

const buttons = {
  0: 'left',
  1: 'middle',
  2: 'right'
}

function getButtonName (eventButtonCode) {
  return buttons[eventButtonCode] || 'left'
}

export function move ({ x, y, scroll = false }) {
  socket.emit(c.WS_MOUSE_MOVE, { x, y, scroll })
}

export function click (eventButtonCode) {
  const button = getButtonName(eventButtonCode)
  socket.emit(c.WS_MOUSE_CLICK, { button: button, double: false })
}

export function doubleClick (eventButtonCode) {
  const button = getButtonName(eventButtonCode)
  socket.emit(c.WS_MOUSE_CLICK, { button: button, double: true })
}

export function toggle ({ button = 'left', pressed = true }) {
  socket.emit(c.WS_MOUSE_TOGGLE, { button, pressed })
  return {
    type: c.MOUSE_TOGGLE,
    payload: { button, pressed }
  }
}
