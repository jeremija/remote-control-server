import Immutable from 'seamless-immutable'
import React from 'react'
import classnames from 'classnames'
import { PropTypes, keyboard, mouse } from '../PropTypes'

export const BUTTONS = Immutable(['left', 'right', 'middle'])
export const KEYS = Immutable(['control', 'shift', 'alt', 'meta'])

class Button extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    pressed: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  }
  handleClick = event => {
    event.preventDefault()
    const { onClick, type, name, pressed } = this.props
    const payload = { [type]: name, pressed: !pressed }
    onClick(payload)
    return false
  }
  render () {
    const { name, label, pressed, type } = this.props
    return (
      <button
        className={classnames(type, name, { pressed })}
        onMouseDown={this.handleClick}
      >
        {label}
      </button>
    )
  }
}

export default class Buttons extends React.PureComponent {
  static propTypes = {
    keyboard,
    mouse,
    handleKeyboardToggle: PropTypes.func.isRequired,
    handleMouseToggle: PropTypes.func.isRequired
  }
  render () {
    const {
      keyboard, mouse, handleKeyboardToggle, handleMouseToggle
    } = this.props

    return (
      <div className='view-buttons'>
        {BUTTONS.map(buttonName => (
          <Button
            key={buttonName}
            label={buttonName}
            name={buttonName}
            onClick={handleMouseToggle}
            pressed={mouse[buttonName]}
            type='button'
          />
        ))}
        {KEYS.map(keyName => (
          <Button
            key={keyName}
            label={keyName}
            name={keyName}
            onClick={handleKeyboardToggle}
            pressed={keyboard[keyName]}
            type='key'
          />
        ))}
      </div>
    )
  }
}
