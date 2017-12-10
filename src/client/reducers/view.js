import { VIEW_SET } from '../../constants'
import Immutable from 'seamless-immutable'

const defaultState = Immutable({
  activeView: 'mousepad'
})

export function view (state = defaultState, action) {
  switch (action && action.type) {
    case VIEW_SET:
      return state.merge({ active: action.payload.view })
    default:
      return state
  }
}
