import * as SocketActions from './SocketActions'
import * as c from '../../constants'

export function press ({ alt, ctrl, shift, meta, code, string }) {
  SocketActions.keyPress({ alt, ctrl, shift, meta, code, string })
}

export function toggle ({ key, pressed }) {
  SocketActions.keyToggle({ key, pressed })
  return {
    type: c.KEYBOARD_TOGGLE,
    payload: { key, pressed }
  }
}
