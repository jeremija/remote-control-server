import _PropTypes from 'prop-types'

import * as _KeyboardActions from './actions/KeyboardActions'
import * as _MouseActions from './actions/MouseActions'
import * as _ViewActions from './actions/ViewActions'

const propsByType = {
  'function': _PropTypes.func
}

function buildActionProps (Actions) {
  const propTypes = Object.keys(Actions)
  .filter(key => {
    const type = typeof Actions[key]
    return !!propsByType[type]
  })
  .reduce((props, key) => {
    const type = typeof Actions[key]
    props[key] = propsByType[type].isRequired
    return props
  }, {})
  return PropTypes.shape(propTypes)
}

export const PropTypes = _PropTypes

export const KeyboardActions = buildActionProps(_KeyboardActions)
export const ViewActions = buildActionProps(_ViewActions)
export const MouseActions = buildActionProps(_MouseActions)

export const keyboard = PropTypes.shape({
  control: PropTypes.bool.isRequired,
  alt: PropTypes.bool.isRequired,
  shift: PropTypes.bool.isRequired,
  meta: PropTypes.bool.isRequired
})

export const mouse = PropTypes.shape({
  left: PropTypes.bool.isRequired,
  right: PropTypes.bool.isRequired,
  middle: PropTypes.bool.isRequired
})

export const view = PropTypes.shape({
  activeView: PropTypes.string.isRequired
})
