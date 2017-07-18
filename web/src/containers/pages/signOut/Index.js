import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import { removeAuthToken } from '../../../redux/modules/Auth'
import {api as API} from 'Config'

class SignOut extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
    const {removeAuthToken} = this.props
    removeAuthToken()
    window.location = `${API.root}/v1/auth/signIn`
  }

  render() {
    return <p>ログアウト中</p>
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {removeAuthToken}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)
