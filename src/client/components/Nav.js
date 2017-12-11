import React from 'react'
import classnames from 'classnames'
import { PropTypes } from '../PropTypes'

const VIEWS = [{
  icon: 'icon-mouse',
  name: 'mouse'
}, {
  icon: 'icon-arrows',
  name: 'arrows'
// }, {
//   icon: 'icon-logs',
//   name: 'log'
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
    const { active, name, icon } = this.props
    return (
      <button
        className={classnames('nav-button', name, { active })}
        onClick={this.handleClick}
      >
        <span className={'icon ' + icon} />
      </button>
    )
  }
}

export default class Nav extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeView: PropTypes.oneOf(VIEWS.map(view => view.name)).isRequired
  }
  render () {
    const { activeView, onChange } = this.props

    return (
      <nav>
        <ul>
          {VIEWS.map(view => {
            const active = view.name === activeView
            return (
              <li key={view.name}>
                <NavButton
                  active={active}
                  onClick={onChange}
                  name={view.name}
                  icon={view.icon}
                />
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}
