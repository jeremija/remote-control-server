import React from 'react'
import {
  KeyboardActions,
  MouseActions,
  ViewActions,
  PropTypes,
  keyboard,
  mouse
} from '../PropTypes'

import Arrows from './Arrows'
import Buttons from './Buttons'
import Input from './Input'
// import Log from './log.js'
import Mouse from './Mouse'
import Navbar from './Navbar'

const VIEWS = {
  mouse: Mouse,
  arrows: Arrows,
  log: () => <div>Not implemented</div>
}

class App extends React.PureComponent {
  static propTypes = {
    view: PropTypes.string.isRequired,
    KeyboardActions,
    MouseActions,
    ViewActions,
    keyboard,
    mouse
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
    const View = VIEWS[view]

    return (<div className='app'>
      <Navbar
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
        onType={KeyboardActions.type}
      />
    </div>)
  }
}

export default App
