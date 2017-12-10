import Immutable from 'seamless-immutable'
import { MOUSE_BUTTON_PRESS } from '../../constants'

const mouseState = Immutable({
  left: false,
  right: false,
  middle: false
})

export function mouse (state = mouseState, action) {
  switch (action && action.type) {
    case MOUSE_BUTTON_PRESS:
      const { button, pressed } = action.payload
      return state.setIn(button, !!pressed)
    default:
      return state
  }
}
