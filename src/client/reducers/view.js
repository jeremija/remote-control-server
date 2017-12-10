import { VIEW_SET } from '../../constants'
import Immutable from 'seamless-immutable'

const defaultState = Immutable({
  activeView: 'mouse'
})

export function view (state = defaultState, action) {
  switch (action && action.type) {
    case VIEW_SET:
      return state.merge({ activeView: action.payload.view })
    default:
      return state
  }
}
