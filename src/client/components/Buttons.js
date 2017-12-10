import React from 'react'
import classnames from 'classnames'
import { PropTypes, keyboard, mouse } from '../PropTypes'

const BUTTONS = ['left', 'right', 'middle']
const KEYS = ['control', 'shift', 'alt', 'meta']

class Button extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    pressed: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  }
  handleClick = () => {
    const { onClick, type, name, pressed } = this.props
    const payload = { [type]: name, pressed: !pressed }
    onClick(payload)
  }
  render () {
    const { name, label, pressed } = this.props
    return (
      <button
        className={classnames('button', name, { pressed })}
        onClick={this.handleClick}
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
      <div className='buttons'>
        {BUTTONS.map(buttonName => (
          <Button
            name={buttonName}
            onClick={handleMouseToggle}
            pressed={mouse[buttonName]}
            label={buttonName}
            type='button'
          />
        ))}
        {KEYS.map(buttonName => (
          <Button
            name={buttonName}
            onClick={handleKeyboardToggle}
            pressed={keyboard[buttonName]}
            label={buttonName}
            type='key'
          />
        ))}
      </div>
    )
  }
}
