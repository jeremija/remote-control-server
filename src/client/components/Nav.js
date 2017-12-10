import React from 'react'
import classnames from 'classnames'
import { PropTypes } from '../PropTypes'

const VIEWS = [{
  icon: 'icon-mouse',
  name: 'mousepad'
}, {
  icon: 'icon-arrows',
  name: 'arrows'
}, {
  icon: 'icon-logs',
  name: 'log'
}]

class NavButton extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }
  handleClick = () => {
    const { onClick, name } = this.props
    onClick(name)
  }
  render () {
    const { active, icon } = this.props
    return (
      <button
        className={classnames({ active })}
        handleClick={this.handleClick}
      >
        <span className={'icon ' + icon} />
      </button>
    )
  }
}

export default class Nav extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeView: PropTypes.oneOf(VIEWS.map(view => view.name))
  }
  render () {
    const { activeView, onChange } = this.props

    return (
      <ul>
        {VIEWS.map(view => (
          <li
            className={classnames({ active: view.name === activeView })}
            key={view.name}
          >
            <NavButton
              onClick={onChange}
              name={view.name}
              icon={view.icon}
            />
          </li>
        ))}
      </ul>
    )
  }
}
