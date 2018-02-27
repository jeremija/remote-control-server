import React from 'react'
import { PropTypes } from '../PropTypes'

export default class Input extends React.PureComponent {
  static propTypes = {
    onType: PropTypes.func.isRequired
  }
  handleKeyUp = event => {
    const { onType } = this.props
    event.preventDefault()
    const alt = event.altKey || false
    const ctrl = event.ctrlKey || false
    const shift = event.shiftKey || false
    const meta = event.metaKey || false
    const code = event.which || event.keyCode
    const string = event.target.value
    event.target.value = ''
    onType({alt, ctrl, shift, meta, code, string})
  }
  render () {
    return (
      <div className='input'>
        <input
          autoComplete='new-password'
          onKeyUp={this.handleKeyUp}
          placeholder={String.fromCharCode(parseInt('e803', 16))}
          type='password'
        />
      </div>
    )
  }
}
