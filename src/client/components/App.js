import Immutable from 'seamless-immutable'
import React from 'react'
import {
  KeyboardActions,
  MouseActions,
  ViewActions,
  keyboard,
  mouse,
  view
} from '../PropTypes'

import Arrows from './Arrows'
import Buttons from './Buttons'
import Input from './Input'
// import Log from './log.js'
import Mouse from './Mouse'
import Nav from './Nav'

export const VIEWS = Immutable({
  mouse: Mouse,
  arrows: Arrows
  // log: () => <div>Not implemented</div>
})

export default class App extends React.PureComponent {
  static propTypes = {
    KeyboardActions,
    MouseActions,
    ViewActions,
    keyboard,
    mouse,
    view
  }
  render () {
    const {
      KeyboardActions,
      MouseActions,
      ViewActions,
      view,
      keyboard,
      mouse
    } = this.props
    const View = VIEWS[view.activeView]

    return (<div className='app'>
      <Nav
        activeView={view.activeView}
        onChange={ViewActions.setView}
        ViewActions={ViewActions}
      />
      <View
        KeyboardActions={KeyboardActions}
        MouseActions={MouseActions}
      />
      <Buttons
        keyboard={keyboard}
        mouse={mouse}
        handleKeyboardToggle={KeyboardActions.toggle}
        handleMouseToggle={MouseActions.toggle}
      />
      <Input
        onType={KeyboardActions.press}
      />
    </div>)
  }
}
