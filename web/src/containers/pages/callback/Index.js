import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import { setAuthToken } from '../../../redux/modules/Auth'

class Callback extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
    const {setAuthToken} = this.props
    let token = this.props.location.search.match(/\?token=(.*)/)[1]
    setAuthToken(token)
    this.props.history.push('/')
  }

  render() {
    return <p>認証中</p>
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {setAuthToken}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)
