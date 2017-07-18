import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router'
import {api as API} from 'Config'
import { TOKEN_COOKIE_KEY } from '../../../constants/Index'
import { getMe } from '../../../redux/modules/Auth'
import { getCookie } from '../../../utils/CookieUtil'


class Authenticate extends Component {
  static propTypes = {
    auth: PropTypes.any,
    children: PropTypes.object,
    push: PropTypes.func,
    location: PropTypes.object
  }

  componentWillMount() {
    const {getMe} = this.props
    let token = getCookie(TOKEN_COOKIE_KEY)
    if (token) {
      getMe(token)
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    let token = getCookie(TOKEN_COOKIE_KEY)
    return (
      token ?
        <Route children={this.props.children}/>
       :
        window.location = `${API.root}/v1/auth/signIn`

    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {getMe}), dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticate))