import {bindActionCreators} from 'redux'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import routes from '../routes'

class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {store} = this.props

    return (
      <Provider store={store}>
        <Router>
          {routes}
        </Router>
      </Provider>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)