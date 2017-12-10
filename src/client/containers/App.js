import * as KeyboardActions from '../actions/KeyboardActions'
import * as MouseActions from '../actions/MouseActions'
import * as ViewActions from '../actions/ViewActions'
import App from '../components/App'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  const { keyboard, mouse, view } = state
  return { keyboard, mouse, view }
}

function mapDispatchToProps (dispatch) {
  return {
    KeyboardActions: {
      ...KeyboardActions,
      toggle: bindActionCreators(KeyboardActions.toggle, dispatch)
    },
    MouseActions: {
      ...MouseActions,
      toggle: bindActionCreators(MouseActions.toggle, dispatch)
    },
    ViewActions: bindActionCreators(ViewActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
