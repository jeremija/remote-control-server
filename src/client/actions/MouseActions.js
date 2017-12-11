import * as SocketActions from './SocketActions'
import c from '../../constants'

const buttons = {
  0: 'left',
  1: 'middle',
  2: 'right'
}

function getButtonName (eventButtonCode) {
  return buttons[eventButtonCode]
}

export function move ({ x, y, scroll = false }) {
  SocketActions.mouseMove({ x, y, scroll })
}

export function click (eventButtonCode) {
  const button = getButtonName(eventButtonCode)
  SocketActions.mouseClick({ button, double: false })
}

export function doubleClick (eventButtonCode) {
  const button = getButtonName(eventButtonCode)
  SocketActions.mouseClick({ button, double: true })
}

export function toggle ({ button, pressed }) {
  SocketActions.mouseToggle({ button, pressed })
  return {
    type: c.MOUSE_TOGGLE,
    payload: { button, pressed }
  }
}
