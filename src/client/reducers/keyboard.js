import Immutable from 'seamless-immutable'
import { KEYBOARD_TOGGLE } from '../../constants'

const keyboardState = Immutable({
  control: false,
  alt: false,
  shift: false,
  meta: false
})

export function keyboard (state = keyboardState, action) {
  switch (action && action.type) {
    case KEYBOARD_TOGGLE:
      const { key, pressed } = action.payload
      return state.setIn([ key ], !!pressed)
    default:
      return state
  }
}
