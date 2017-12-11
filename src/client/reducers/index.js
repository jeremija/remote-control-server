import { combineReducers } from 'redux'
import { keyboard } from './keyboard'
import { mouse } from './mouse'
import { view } from './view'

export default combineReducers({
  keyboard,
  mouse,
  view
})
