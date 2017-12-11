import React from 'react'
import { KeyboardActions, PropTypes } from '../PropTypes'
import Immutable from 'seamless-immutable'

export const BUTTONS = Immutable([{
  className: 'icon empty-space',
  text: '\u00a0'
}, {
  className: 'icon up icon-up-open',
  code: 38
}, {
  className: 'icon empty-space',
  text: '\u00a0'
}, {
  className: 'icon left icon-left-open',
  code: 37
}, {
  className: 'icon ok icon-check',
  code: 13
}, {
  className: 'icon right icon-right-open',
  code: 39
}, {
  className: 'icon escape icon-cancel',
  code: 27
}, {
  className: 'icon down icon-down-open',
  code: 40
}, {
  className: 'icon backspace icon-level-up',
  code: 8
}])

class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string,
    code: PropTypes.number,
    onClick: PropTypes.func.isRequired
  }
  handleClick = () => {
    const { onClick, code } = this.props
    code && onClick({ code })
  }
  render () {
    const { className, label } = this.props
    return (
      <button className={className} onClick={this.handleClick}>
        {label}
      </button>
    )
  }
}

export default class Arrows extends React.PureComponent {
  static propTypes = {
    KeyboardActions
  }
  render () {
    const { KeyboardActions } = this.props
    return (
      <div className='view-arrows'>
        <div className='buttons'>
          {BUTTONS.map((button, i) => (
            <Button
              className={button.className}
              code={button.code}
              key={i}
              onClick={KeyboardActions.press}
              label={button.text}
            />
          ))}
        </div>
      </div>
    )
  }
}
