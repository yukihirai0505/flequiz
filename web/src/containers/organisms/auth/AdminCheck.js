import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import { withRouter } from 'react-router'
import Dashboard from "../../pages/ranking/Index";


class AdminCheck extends Component {
  static propTypes = {
    auth: PropTypes.any,
    children: PropTypes.object,
    push: PropTypes.func,
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { me } = this.props
    let isAdmin = me ? me.isAdmin: false
    return (
      isAdmin ?
        <Route children={this.props.children}/>
       :
        <Redirect from="/" to="/ranking"/>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.auth.me
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {}), dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCheck))