import App from '../components/App'
import KeyboardActions from '../actions/KeyboardActions'
import MouseActions from '../actions/MouseActions'
import ViewActions from '../actions/ViewActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  const { keyboard, mouse, nav } = state
  return { keyboard, mouse, nav }
}

function mapDispatchToProps (dispatch) {
  return {
    KeyboardActions: bindActionCreators(KeyboardActions, dispatch),
    MouseActions: bindActionCreators(MouseActions, dispatch),
    ViewActions: bindActionCreators(ViewActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
